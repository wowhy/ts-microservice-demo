import { ConsumerGroup } from 'kafka-node'
import { logger } from '@utils/logger'

import { IEventDispatcher, IEvent, IEventSubscriber } from './interfaces'

export class KafkaEventSubscriber implements IEventSubscriber {
  constructor(public dispatcher: IEventDispatcher, private consumer: ConsumerGroup) {}

  async subscribe() {
    this.consumer.on('message', async message => {
      try {
        logger.debug(message.topic, message.topic, message.partition, message.offset)

        const e = parseValue(message.value)
        await this.handler(e)

        this.consumer.setOffset(message.topic, message.partition, message.offset + 1)

        this.consumer.commit(true, err => {
          if (err) {
            logger.error(err)
          }
        })
      } catch (err) {
        logger.error(err)
      }
    })
  }

  async handler(e: IEvent) {
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
