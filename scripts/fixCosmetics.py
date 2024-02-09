import json
import os



newdict={
  "skins": []
}
with open("../vendor/swordbattle.io/cosmetics.json") as f:
  js=json.load(f)

# print(json.dumps(js, indent=2))

for i in js["skins"].keys():
  newdict["skins"].append(js["skins"][i])

with open("../cosmetics.json", "w") as f:
  json.dump(newdict,f,indent=2)