import { Producer, KeyedMessage } from 'kafka-node'
import { IEventPublisher, IEvent } from './interfaces'

export class KafkaEventPublisher implements IEventPublisher {
  constructor(private producer: Producer) {}

  async publish(e: IEvent) {
    await new Promise((resolve, reject) => {
      this.producer.send(
        [
          {
            topic: e.eventName,
            messages: [new KeyedMessage(e.aggregateId, JSON.stringify(e))]
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
