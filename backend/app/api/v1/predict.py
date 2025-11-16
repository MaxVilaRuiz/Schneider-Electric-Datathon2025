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
import shap
from sklearn.metrics import f1_score

router = APIRouter()

class PredictInput(BaseModel):
    attributes: List[float]

@router.post("/")
async def predict_values(data: PredictInput):
    print("Received: ", data.attributes)
    # Here we call the model, these are simulated data
    # TODO: delete before commit
    X_input = np.array(data.attributes).reshape(1, -1)
    y_hat = model.predict(X_input)
    y_hat = [0 if val < threshold else 1 for val in y_hat]

    BASE_PATH = Path(__file__).resolve().parents[4]
    DATA_PATH = BASE_PATH / "ml" / "data" / "dataset.csv"
    df = pd.read_csv(DATA_PATH)
    X = df.drop(columns=["target_variable", "id"])
    data_df = pd.DataFrame([data.attributes])
    shap_result = explain_row(data_df, X)

    prediction = 1
    probability = 0.82
    return PredictResponse(prediction=prediction, probability=probability)

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