from collections import defaultdict
from pydantic import BaseModel
class TrieNode(BaseModel):
    children : dict
    isWordEnd : bool
    meanings : list
    type : list

class Output(BaseModel):
    word : str
    meanings : list
    type : list


class Trie(BaseModel):
    root : TrieNode

    def insert(self , word : str , meanings : list , type : list ):
        current = self.root
        for i in word.lower():
            current.children.setdefault(i , TrieNode(children = dict() , isWordEnd = False , meanings = [] , type = []))
            current = current.children.get(i)
        current.isWordEnd = True
        current.meanings = meanings
        current.type = type

    def prefixSearch(self , prefix : str):
        current = self.root
        words = []
        for i in prefix.lower():
            if i not in current.children:
                return []
            current = current.children.get(i)
        self.getWordsWithPrefix(current , prefix , words)
        return words

    def getWordsWithPrefix(self , node : TrieNode , word : str , words : list):
        for char in node.children.keys():
                self.getWordsWithPrefix(node.children.get(char) , word + char , words)
        if node.isWordEnd:
            words.append(Output(word = word , meanings = node.meanings , type = node.type))

    def getWord(self , word : str):
        current = self.root
        for i in word.lower():
            if i not in current.children:
                return []
            current = current.children.get(i)
        if current.isWordEnd:
            return [Output(word = word , meanings = current.meanings , type = current.type)]

