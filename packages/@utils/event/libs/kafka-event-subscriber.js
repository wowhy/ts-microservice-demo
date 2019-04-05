"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@utils/logger");
class KafkaEventSubscriber {
    constructor(dispatcher, consumer) {
        this.dispatcher = dispatcher;
        this.consumer = consumer;
    }
    async subscribe() {
        this.consumer.on('message', async (message) => {
            try {
                logger_1.logger.debug(message.topic, message.topic, message.partition, message.offset);
                const e = parseValue(message.value);
                await this.handler(e);
                this.consumer.setOffset(message.topic, message.partition, message.offset + 1);
                this.consumer.commit(true, err => {
                    if (err) {
                        logger_1.logger.error(err);
                    }
                });
            }
            catch (err) {
                logger_1.logger.error(err);
            }
        });
    }
    async handler(e) {
        await this.dispatcher.dispatch(e);
    }
}
exports.KafkaEventSubscriber = KafkaEventSubscriber;
function parseValue(val) {
    try {
        if (Buffer.isBuffer(val)) {
            return JSON.parse(val.toString('utf8'));
        }
        else {
            return JSON.parse(val);
        }
    }
    catch (ex) {
        return {
            raw: val
        };
    }
}
//# sourceMappingURL=kafka-event-subscriber.js.map