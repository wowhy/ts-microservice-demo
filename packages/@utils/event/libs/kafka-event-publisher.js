'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const kafka_node_1 = require('kafka-node')
class KafkaEventPublisher {
  constructor(producer) {
    this.producer = producer
  }
  async publish(e) {
    await new Promise((resolve, reject) => {
      this.producer.send(
        [
          {
            topic: e.eventName,
            key: e.aggregateId,
            messages: [JSON.stringify(e)]
            // messages: [new kafka_node_1.KeyedMessage(e.aggregateId, JSON.stringify(e))]
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
