import pymongo , gridfs , pickle , trie
from pymongo.server_api import ServerApi

client = pymongo.MongoClient("mongodb+srv://root:root@cluster0.fsiubvv.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi('1'))
db = client.trie
grid = gridfs.GridFS(db)

wordTrie : trie.Trie = pickle.loads(grid.find_one({"filename" : "Trie"}).read())
print(wordTrie)

