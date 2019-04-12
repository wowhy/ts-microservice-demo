import { logger } from '@utils/logger'

import { IEventDispatcher, IEvent, IEventSubscriber, IMsgFailedHandler } from './interfaces'

export class KafkaEventSubscriber implements IEventSubscriber {
  constructor(
    private consumer,
    private dispatcher: IEventDispatcher,
    private msgFailedHandler: IMsgFailedHandler
  ) {}

  async subscribe() {
    this.consumer.on('message', async message => {
      try {
        logger.debug(message.topic, message.topic, message.partition, message.offset)
        this.consumer.pause()
        const e = parseValue(message.value)

        // 消费消息
        const retries = 3
        for (let i = 0; i < 3; i++) {
          try {
            await this.handle(e)
            break
          } catch (ex) {
            // nothing
            logger.error(`event retrie ${i + 1}`, ex)

            if (i === retries - 1) {
              try {
                // 处理错误消息
                await this.msgFailedHandler.handle(message)
              } catch (exAgain) {
                logger.error(exAgain)
                this.consumer.client.close()
                return
              }
            }
          }
        }

        this.consumer.setOffset(message.topic, message.partition, message.offset + 1)

        this.consumer.commit(true, err => {
          if (err) {
            logger.error(err)
            this.consumer.client.close()
          } else {
            this.consumer.resume()
          }
        })
      } catch (err) {
        logger.error(err)
        this.consumer.client.close()
      }
    })
  }

  async handle(e: IEvent) {
    await this.dispatcher.dispatch(e)
  }
}

function parseValue(val: string | Buffer) {
  try {
    if (Buffer.isBuffer(val)) {
      return JSON.parse((val as Buffer).toString('utf8'))
    } else {
      return JSON.parse(val)
    }
  } catch (ex) {
    return {
      raw: val
    }
  }
}
