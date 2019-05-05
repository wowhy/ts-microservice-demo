"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@utils/logger");
class KafkaEventSubscriber {
    constructor(consumer, dispatcher, failedEventHandler) {
        this.consumer = consumer;
        this.dispatcher = dispatcher;
        this.failedEventHandler = failedEventHandler;
    }
    async subscribe() {
        this.consumer.on('message', async (message) => {
            try {
                logger_1.logger.debug(message.topic, message.topic, message.partition, message.offset);
                this.consumer.pause();
                const e = parseValue(message.value);
                const retries = 3;
                for (let i = 0; i < 3; i++) {
                    try {
                        await this.handle(e);
                        break;
                    }
                    catch (ex) {
                        logger_1.logger.error(`event retrie ${i + 1}`, ex);
                        if (i === retries - 1) {
                            try {
                                await this.failedEventHandler.handle(message);
                            }
                            catch (exAgain) {
                                logger_1.logger.error(exAgain);
                                this.consumer.client.close();
                                return;
                            }
                        }
                    }
                }
                this.consumer.setOffset(message.topic, message.partition, message.offset + 1);
                this.consumer.commit(true, err => {
                    if (err) {
                        logger_1.logger.error(err);
                        this.consumer.client.close();
                    }
                    else {
                        this.consumer.resume();
                    }
                });
            }
            catch (err) {
                logger_1.logger.error(err);
                this.consumer.client.close();
            }
        });
    }
    async handle(e) {
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
//# sourceMappingURL=kafka.subscriber.js.map