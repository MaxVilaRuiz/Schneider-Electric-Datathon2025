from fastapi import APIRouter
from app.schemas.predict_schema import PredictRequest, PredictResponse
from app.models.model_loader import model
from pydantic import BaseModel
from typing import List

from app.models.model_loader import model, threshold
import pandas as pd
from sklearn.model_selection import train_test_split
from pathlib import Path
import numpy as np
from scipy.stats import norm
import shap
from sklearn.metrics import f1_score
import haystack
from haystack_integrations.components.generators.ollama import OllamaGenerator

router = APIRouter()

class PredictInput(BaseModel):
    attributes: List[float]

@router.post("/")
async def predict_values(data: PredictInput):
    X_input = np.array(data.attributes).reshape(1, -1)
    BASE_PATH = Path(__file__).resolve().parents[4]
    DATA_PATH = BASE_PATH / "ml" / "data" / "dataset.csv"
    df = pd.read_csv(DATA_PATH)
    X = df.drop(columns=["target_variable", "id"])
    data_df = pd.DataFrame([data.attributes])

    numerical = X.drop(columns=["competitor_Z", "competitor_Y", "competitor_X", "cust_in_iberia"])
    pct_mean = numerical.mean()
    pct_std = numerical.std()
    X_input_normalized = [
        (X_input[i] - pct_mean.iloc[i]) / pct_std.iloc[i] if i <= 10 else X_input[i]
        for i in range(len(X_input))
    ]
    X_input = np.array(X_input_normalized).reshape(1, -1)
    print("Received: ", X_input)

    y_hat = model.predict(X_input)
    y_hat = [0 if val < threshold else 1 for val in y_hat]

    shap_result = explain_row(data_df, X)
    response = process_w_llm(shap_result)
    
    return PredictResponse(summary=response, features=shap_result["features"], 
    values=shap_result["values"], base_value=shap_result["base_value"], prediction=shap_result["prediction"])

@router.post("/")
def dummy_predict():
    return {"message": "Predict endpoint working..."}

@router.get("/test-model")
def test_model_loaded():
    num_layers = len(model.layers)
    return {"status": "model_loaded", "num_layers": num_layers}

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
    return result["replies"]