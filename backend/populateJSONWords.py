import json

filesList = []
count = 97
for i in range(26):
    filesList.append(chr(count))
    count += 1
filesList.append("misc")

outFile = open("words/optimizedWords.json" , "w")

outDict = {}


for filename in filesList:
    with open(f"words/{filename}.json" , "r") as f:
        out = json.load(f)
        for i in out:
            wordDict = {"meanings" : [] , "speech_part" : []}
            meanings = out.get(i).get("meanings")
            if(meanings is None):
                continue
            for j in meanings:
                wordDict["meanings"].append(j.get("def"))
                wordDict["speech_part"].append(j.get("speech_part"))
            i = i.strip().lower()
            outDict[i] = wordDict

json.dump(outDict , outFile , indent=4)

outFile.close()