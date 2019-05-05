import { KafkaClient, Producer, KeyedMessage } from 'kafka-node'

import { KafkaEventPublisher } from '@utils/event/libs/kafka'
import { logger } from '@utils/logger'

import { kafkaConfig } from '../config/kafka.config'

const client = new KafkaClient(kafkaConfig)
const producer = new Producer(client, {
  requireAcks: 1
})

client.on('close', () => {
  logger.error('kafka client closed')
  process.exit(0)
})

producer.on('error', err => {
  logger.error(err)
  process.exit(0)
})

let publisher: KafkaEventPublisher

export const eventPublisherProvider = {
  provide: 'eventPublisher',
  useFactory: async () => {
    if (!publisher) {
      publisher = await new Promise((resolve, reject) => {
        producer.on('ready', () => {
          resolve(new KafkaEventPublisher(KeyedMessage, producer))
        })
      })
    }

    return publisher
  }
}
