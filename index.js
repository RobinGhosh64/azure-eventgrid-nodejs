const express = require('express')
var bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.post('/event', (req, res) => {
    var header = req.get("Aeg-Event-Type");
    if(header && header === 'SubscriptionValidation'){
         var event = req.body[0]
         var isValidationEvent = event && event.data && 
                                 event.data.validationCode &&
                                 event.eventType && event.eventType == 'Microsoft.EventGrid.SubscriptionValidationEvent'
         if(isValidationEvent){
             return res.send({
                "validationResponse": event.data.validationCode
            })
         }
    }

    // Do something on other event types 
    console.log(req.body)
    res.send(req.body)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))