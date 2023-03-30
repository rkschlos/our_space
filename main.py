from fastapi import FastAPI
from routers import jobs_api
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(jobs_api.router)