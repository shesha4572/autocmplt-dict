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

@app.get("/tries")
async def getTrie():
    out = database.start()
    out_lst = []
    for i in out:
        val = list(i.items())[0]
        out_lst.append(Output(word = val[0] , meaning = val[1]))
    return out_lst

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)