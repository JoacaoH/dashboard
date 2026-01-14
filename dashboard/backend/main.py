from fastapi import FastAPI
from google.cloud import bigquery

app = FastAPI()
client = bigquery.Client()

@app.get('/api/dashboard/{user_email}')


@app.get("/")
async def root():
    return {"message": "Hello World"}