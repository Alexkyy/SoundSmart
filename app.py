from fastapi import FastAPI
from pydantic import BaseModel
from gen_data import generate_user_data
from gen_card_savings import generate_savings_report

app = FastAPI()

class UserRequest(BaseModel):
    email: str
    n_transactions: int = 200

# Endpoint to generate mock data
@app.post("/generate-data/")
def create_user_data(req: UserRequest):
    safe_id = req.email.replace("@", "_").replace(".", "_")
    paths = generate_user_data(safe_id, req.n_transactions)
    return {"user_id": safe_id, "paths": paths}

# Endpoint to generate card savings report
@app.post("/card-report/")
def card_report(req: UserRequest):
    safe_id = req.email.replace("@", "_").replace(".", "_")
    report = generate_savings_report(safe_id, categories_csv=f"test_data/{safe_id}/top_categories.csv")
    return {"user_id": safe_id, "report": report}
