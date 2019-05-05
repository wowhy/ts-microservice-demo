import { IEventPublisher, IEvent } from '../interfaces'

export class KafkaEventPublisher implements IEventPublisher {
  constructor(private KeyedMessage, private producer) {}

  async publish(e: IEvent) {
    await new Promise((resolve, reject) => {
      this.producer.send(
        [
          {
            topic: e.eventName,
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
