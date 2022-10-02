from collections import defaultdict
from pydantic import BaseModel
class TrieNode(BaseModel):
    children : dict
    isWordEnd : bool
    meaning : str

class Trie(BaseModel):
    root : TrieNode

    def insert(self , word : str , meaning : str):
        current = self.root
        for i in word.lower():
            current.children.setdefault(i , TrieNode(children = dict() , isWordEnd = False , meaning = ""))
            current = current.children.get(i)
        current.isWordEnd = True
        current.meaning = meaning

    def prefixSearch(self , prefix : str):
        current = self.root
        words = []
        for i in prefix.lower():
            if i not in current.children:
                return []
            current = current.children.get(i)
        self.getWords(current , prefix , words)
        return words

    def getWords(self , node : TrieNode , word : str , words : list):
        for char in node.children.keys():
                self.getWords(node.children.get(char) , word + char , words)
        if node.isWordEnd:
            words.append({word : node.meaning})

    ''' def as_dict(self):
        dict = {"isWordEnd" : self.root.isWordEnd , "meaning" : self.root.meaning}
        current = self.root
        for i in current.children: '''


