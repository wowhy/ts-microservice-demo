'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
class KafkaEventPublisher {
  constructor(KeyedMessage, producer) {
    this.KeyedMessage = KeyedMessage
    this.producer = producer
  }
  async publish(e) {
    await new Promise((resolve, reject) => {
      this.producer.send(
        [
          {
            topic: e.eventName,
            key: e.aggregateId,
            // messages: [JSON.stringify(e)]
            messages: [new this.KeyedMessage(e.aggregateId, JSON.stringify(e))]
          }
        ],
        err => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }
}
exports.KafkaEventPublisher = KafkaEventPublisher
//# sourceMappingURL=kafka-event-publisher.js.map
