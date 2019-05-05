import { IFailedEventHandler } from '../interfaces'

export class KafkaFailedEventHandler implements IFailedEventHandler {
  constructor(private KeyedMessage, private producer) {}

  async handle(message) {
    await new Promise((resolve, reject) => {
      this.producer.send(
        [
          {
            topic: `error.${message.topic}`,
            messages: [new this.KeyedMessage(message.key, message.value)]
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
