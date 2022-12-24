

module.exports.processEvents = async (event) => {
    let records = event.records;
    let batchItemFailures = [];

    if (records.length) {
        for (const record of records) {
            try {
                const parsedBody = JSON.parse(record.body);
                console.log("Processing record ", record)
                console.log("Process vehicle details" , parsedBody)

            } catch (err) {
                batchItemFailures.push({
                    itemIdentifer: record.messageId
                })
            }
        }
    }

    // SQS will get the failed messages and put them back in Queue
    return {
        batchItemFailures: batchItemFailures
    }
}   
