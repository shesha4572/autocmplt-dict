from fastapi import FastAPI , HTTPException
from fastapi.middleware.cors import CORSMiddleware
import database, trie

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"])

wordsTrie: trie.Trie = database.getTrie()


@app.get("/searchPrefix/{prefix}")
async def getWordsWithPrefix(prefix: str):
    output = wordsTrie.prefixSearch(prefix)
    return {"result" : output}


@app.get("/getMeanings/{word}")
async def getMeanings(word: str):
    try:
        return wordsTrie.getWord(word.replace("%2", "/"))
    except trie.NoWordFound:
        raise HTTPException(
            status_code=404
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)
