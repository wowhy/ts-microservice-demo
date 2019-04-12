"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KafkaMsgFailedHandler {
    constructor(KeyedMessage, producer) {
        this.KeyedMessage = KeyedMessage;
        this.producer = producer;
    }
    async handle(message) {
        await new Promise((resolve, reject) => {
            this.producer.send([
                {
                    topic: `error.${message.topic}`,
                    messages: [new this.KeyedMessage(message.key, message.value)]
                }
            ], err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.KafkaMsgFailedHandler = KafkaMsgFailedHandler;
//# sourceMappingURL=kafka-msg-failed-handler.js.map