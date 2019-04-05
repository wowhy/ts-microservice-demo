import { KafkaClient, Producer } from 'kafka-node'

import { KafkaEventPublisher } from '@utils/event'
import { logger } from '@utils/logger'

import { kafkaConfig } from '../config/kafka.config'

const client = new KafkaClient(kafkaConfig)
const producer = new Producer(client, {
  requireAcks: 1
})

producer.on('error', err => {
  logger.error(err)
  process.exit(1)
})

let publisher: KafkaEventPublisher

export const eventPublisherProvider = {
  provide: 'eventPublisher',
  useFactory: async () => {
    if (!publisher) {
      publisher = await new Promise((resolve, reject) => {
        producer.on('ready', () => {
          resolve(new KafkaEventPublisher(producer))
        })
      })
    }

    return publisher
  }
}
