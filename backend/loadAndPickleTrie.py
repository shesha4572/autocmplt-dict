import json , pickle , trie , pymongo , gridfs
from pymongo.server_api import ServerApi


file = open("words/optimizedWords.json" , "r")
wordsDict = json.load(file)
file.close()

wordsTrie = trie.Trie(root = trie.TrieNode(children = dict() , isWordEnd = False , meanings = [] , type = []))

for i in wordsDict:
    wordsTrie.insert(word = i , meanings = wordsDict.get(i).get("meanings") , type = wordsDict.get(i).get("speech_part"))

client = pymongo.MongoClient("mongodb+srv://root:root@cluster0.fsiubvv.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi('1'))
db = client.trie
grid = gridfs.GridFS(db)
grid.put(pickle.dumps(wordsTrie) , filename = "Trie")
