from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import database
from pydantic import BaseModel
app = FastAPI()
app.add_middleware(CORSMiddleware , allow_origins = ["http://localhost:3000"])

class Output(BaseModel):
    word : str
    meaning : str

@app.get("/")
async def getHello():
    return {"Hello" : "React"}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)