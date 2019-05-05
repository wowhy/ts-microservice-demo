"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KafkaEventPublisher {
    constructor(KeyedMessage, producer) {
        this.KeyedMessage = KeyedMessage;
        this.producer = producer;
    }
    async publish(e) {
        await new Promise((resolve, reject) => {
            this.producer.send([
                {
                    topic: e.eventName,
                    messages: [new this.KeyedMessage(e.aggregateId, JSON.stringify(e))]
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
exports.KafkaEventPublisher = KafkaEventPublisher;
//# sourceMappingURL=kafka.publisher.js.map