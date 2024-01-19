import json
import os
import requests



newdict={
  "skins": []
}

js=json.loads(requests.get("https://github.com/codergautam/swordbattle.io/raw/main/server/src/cosmetics.json").text)

# print(json.dumps(js, indent=2))

for i in js["skins"].keys():
  newdict["skins"].append(js["skins"][i])

with open("cosmetics.json", "w") as f:
  json.dump(newdict,f,indent=2)