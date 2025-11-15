from fastapi import APIRouter
from app.schemas.explain_schema import ExplainResponse

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
    return {"message": "Explain endpoint working..."}