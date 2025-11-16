from fastapi import APIRouter
from app.schemas.predict_schema import PredictRequest, PredictResponse
from app.models.model_loader import model
from pydantic import BaseModel
from typing import List

router = APIRouter()

class PredictInput(BaseModel):
    attributes: List[float]

@router.post("/")
async def predict_values(data: PredictInput):
    print("Received: ", data.attributes)
    # Here we call the model, these are simulated data
    # TODO: delete before commit
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