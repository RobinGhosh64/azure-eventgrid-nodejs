# Azure Event Grid Node.js

Sample to show how to register a Node.js endpoint with eventgrid.

## Try it out
There is a full walk through at http://www.jamessturtevant.com/posts/Validating-Azure-Event-Grid-WebHook-in-Nodejs


```bash
# create a topic
az group create --name eventgridrg
az eventgrid topic create --name nodejs -l westus2 -g eventgridrg

# register your https endpoint with Event Grid (can use ngrok for local testing)
az eventgrid topic event-subscription create --name expressapp \
          --endpoint https://yoururl/event \
          -g eventgridrg \
          --topic-name nodejs

# send test event
endpoint=$(az eventgrid topic show --name nodejs -g eventgridrg --query "endpoint" --output tsv)
key=$(az eventgrid topic key list --name nodejs -g eventgridrg --query "key1" --output tsv)

# use the example event from docs 
body=$(eval echo "'$(curl https://raw.githubusercontent.com/Azure/azure-docs-json-samples/master/event-grid/customevent.json)'")

# post the sample event
curl -X POST -H "aeg-sas-key: $key" -d "$body" $endpoint
```