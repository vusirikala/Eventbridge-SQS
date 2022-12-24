const EventBridge = require("aws-sdk/clients/eventbridge");
const EVENT_BUS_NAME = process.env.EventBusName;
let eventBridge = new EventBridge();

module.exports.putEvents = async (event) => {
    let body = JSON.parse(event.body);
    console.log("Event bus name: ", EVENT_BUS_NAME)
    let entry = {
        EventBusName: EVENT_BUS_NAME,
        Detail: JSON.stringify({
            vehicleNumber: body.vehicleNumber,
            NIC: body.nic
        }),
        Source: "fuel-app",
        DetailType: "user-signup",
    }
    try {
        let output = await eventBridge.putEvents({Entries: [entry]}).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(output)
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: err.message
        }
    }
}