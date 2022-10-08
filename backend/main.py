from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import database , trie , http

app = FastAPI()
app.add_middleware(CORSMiddleware , allow_origins = ["http://localhost:3000"])

wordsTrie : trie.Trie = database.getTrie()

@app.get("/")
async def getHello():
    return {"Hello" : "React"}

@app.get("/searchPrefix/{prefix}")
async def getWordsWithPrefix(prefix : str):
    output = wordsTrie.prefixSearch(prefix)
    return output

@app.get("/getMeanings/{word}")
async def getMeanings(word : str):
    return wordsTrie.getWord(word)[0]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)