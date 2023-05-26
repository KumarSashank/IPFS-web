import requests

projectId = "2Q6xazpc4TxCCUghubOG4QuSBdN"
projectSecret = "a79ca4769fe0cc2e64dc075fe2bcace9"
endpoint = "https://ipfs.infura.io:5001"

### CREATE AN ARRAY OF TEST FILES ###
file_path = "/Users/kumarsashank/Desktop/Network_flowchart.png"
files = [
        ("file", ("Network_flowchart.png", open(file_path, "rb"))),
    ]
### ADD FILE TO IPFS AND SAVE THE HASH ###
response1 = requests.post(endpoint + '/api/v0/add', files=files, auth=(projectId, projectSecret))
print(response1)
hash = response1.text.split(",")[1].split(":")[1].replace('"','')
print(hash)



### REMOVE OBJECT WITH PIN/RM ###