from fastapi import APIRouter
from app.schemas.predict_schema import PredictRequest, PredictResponse
# from app.models.model_loader import model

router = APIRouter()

@router.post("/", response_model=PredictResponse)
def predict_endpoint(payload: PredictRequest):
    # Here we call the model, these are simulated data
    # TODO: delete before commit
    prediction = 1
    probability = 0.82
    return PredictResponse(prediction=prediction, probability=probability)

@router.post("/")
def dummy_predict():
    return {"message": "Predict endpoint working..."}

# @router.get("/test-model")
# def test_model_loaded():
#     num_layers = len(model.layers)
#     return {"status": "model_loaded", "num_layers": num_layers}