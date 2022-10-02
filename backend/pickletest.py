import pickle
from backend.trie import TrieNode , Trie

t = Trie(root = TrieNode(children = dict() , isWordEnd = False , meaning = ""))
t.insert("hell" , "wgre")
t.insert("hello" , "qgfwg")
t.insert("helloes" , "qfewg")

with open("test.bin", "ab") as f:
    pickle.dump(t , f);

with open("test.bin", "rb") as f:
    t1 : Trie = pickle.load(f)
    print(t1.prefixSearch("helli"))