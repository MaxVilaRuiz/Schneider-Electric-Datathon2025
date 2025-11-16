from fastapi import APIRouter
from app.schemas.explain_schema import ExplainResponse
from app.models.model_loader import model, threshold

# ---- TEST ----
import pandas as pd
from sklearn.model_selection import train_test_split
from pathlib import Path
import numpy as np
import shap
from sklearn.metrics import f1_score
import haystack
from haystack_integrations.components.generators.ollama import OllamaGenerator

def calculate_threshold(y_hat, Y_test):
    thresholds = np.linspace(0, 1, 101)
    best_f1 = 0
    best_t = 0

    for t in thresholds:
        y_test_th = [0 if val < t else 1 for val in y_hat]
        score = f1_score(Y_test, y_test_th)
        if score > best_f1:
            best_f1 = score
            best_t = t
    
    return best_t

router = APIRouter()

@router.post("/", response_model=ExplainResponse)
def explain_endpoint(payload: dict):
    return ExplainResponse(
        prediction=1,
        probability=0.82,
        feature_contributions={"cust_hitrate": 0.23},
        top_features=[{"name": "cust_hitrate", "importance": 0.43}]
    )

@router.get("/")
def dummy_explain():
    BASE_PATH = Path(__file__).resolve().parents[4]
    DATA_PATH = BASE_PATH / "ml" / "data" / "dataset.csv"
    df = pd.read_csv(DATA_PATH)
    target_column = "target_variable"
    Y = df[target_column]
    X = df.drop(columns=[target_column])
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2)
    row = X_test.iloc[[0]]
    id = int(row["id"])
    row = row.drop(columns=["id"])
    y_hat = model.predict(row)
    y_hat = [0 if val < threshold else 1 for val in y_hat]
    X = X.drop(columns=["id"])
    shap_result = explain_row(row, X)

    # This function calls an llm using ollama and processes the SHAP data
    # do not run unless you want to download 1GB smallm on your computer
    #process_w_llm(shap_result)

    return {"message": y_hat, "id": id}

def explain_row(input_df: pd.DataFrame, Xbackground: pd.DataFrame):
    background = Xbackground.sample(min(100, len(Xbackground)), random_state=42)
    explainer = shap.KernelExplainer(model.predict, background)
    shap_values = explainer.shap_values(input_df)
    shap_vals = shap_values[0]
    shap_result = {
        "features": list(input_df.columns),
        "values": shap_vals.tolist(),
        "base_value": float(explainer.expected_value[0]),
        "prediction": float(model.predict(input_df)[0][0]),
    }
    return shap_result

def process_w_llm(shap_result):
    shap_text = f"""
    I have a binary classification prediction model and these are the SHAP results for a row of feature data:

    - Prediction of the model: {shap_result['prediction']:.3f}
    - Base value: {shap_result['base_value']:.3f}
    - Feature relevance: """
    for f, v in zip(shap_result["features"], shap_result["values"]):
        shap_text += f"    {f}: {v}\n"

    shap_text += """
    Explain in a simple and as non technical way what the prediction means, which features had more influence and to which
    direction and why the model took that decision overall. Try to be breif and you don't need to do an introduction to the data.
    """
    print(shap_text)

    generator = OllamaGenerator(model="smollm2:1.7b", url="http://localhost:11434")
    result = generator.run( shap_text )
    #summary = result['answers'][0].answer if result['answers'] else "LLM couldn't summarize."
    print(result["replies"])
    return