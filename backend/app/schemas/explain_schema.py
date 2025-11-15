from pydantic import BaseModel
from typing import Dict, List

class FeatureImportance(BaseModel):
    name: str
    importance: float

class ExplainResponse(BaseModel):
    prediction: int
    probability: float
    feature_contributions: Dict[str, float]
    top_features: List[FeatureImportance]