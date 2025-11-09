from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sound Perks API")

# allow your local dev & prod frontend origins here
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://<your-frontend-domain>"  # replace when you have it
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

# --- your real routes go here ---
# @app.get("/perks")
# def list_perks(): ...
