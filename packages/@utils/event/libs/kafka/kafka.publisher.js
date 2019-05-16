"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_node_1 = require("kafka-node");
class KafkaEventPublisher {
    constructor(topic, producer) {
        this.topic = topic;
        this.producer = producer;
    }
    async publish(e) {
        await new Promise((resolve, reject) => {
            this.producer.send([
                {
                    topic: this.topic,
                    messages: [new kafka_node_1.KeyedMessage(e.aggregateId, JSON.stringify(e))]
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