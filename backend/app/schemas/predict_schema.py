from pydantic import BaseModel

class PredictRequest(BaseModel):
    product_A_sold_in_the_past: float
    product_B_sold_in_the_past: float
    product_A_recommended: float
    product_A: float
    product_C: float
    product_D: float
    cust_hitrate: float
    cust_interactions: float
    cust_contracts: float
    opp_month: float
    opp_old: float

    competitor_X: bool
    competitor_Y: bool
    competitor_Z: bool

class PredictResponse(BaseModel):
    summary: list[str]