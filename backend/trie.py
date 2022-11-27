from pydantic import BaseModel

COUNT = 15
class TrieNode(BaseModel):
    children : dict
    isWordEnd : bool
    meanings : list
    type : list

class MeaningOutput(BaseModel):
    word : str
    meanings : dict

class AutoFillOutput(BaseModel):
    word : str

class NoWordFound(Exception):
    pass

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
        if len(words) > COUNT:
            return
        for char in node.children.keys():
            self.getWordsWithPrefix(node.children.get(char) , word + char , words)
        if node.isWordEnd:
            words.append(AutoFillOutput(word = word))

    def getWord(self , word : str):
        current = self.root
        for i in word.lower():
            if i not in current.children:
                raise NoWordFound
            current = current.children.get(i)
        if current.isWordEnd:
            meanings_dict = {i : [] for i in set(current.type)}
            for i in zip(current.meanings , current.type):
                meanings_dict[i[1]].append(i[0])
            return MeaningOutput(word = word , meanings = meanings_dict)
        raise NoWordFound

