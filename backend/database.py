import pickle
import pymongo
from trie import Trie
from pymongo.server_api import ServerApi

def start():
    client = pymongo.MongoClient("mongodb+srv://root:root@cluster0.fsiubvv.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi('1'))
    db = client.tries
    tries = db.tries
    record = tries.find_one({})
    t : Trie =  pickle.loads(record["Trie"])
    return t.prefixSearch("hell")
