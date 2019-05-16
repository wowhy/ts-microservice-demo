import { KafkaClient, Producer } from 'kafka-node'

import { KafkaEventPublisher } from '@utils/event/libs/kafka'
import { logger } from '@utils/logger'

import { kafkaConfig, topic } from '../config/kafka.config'

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
let promise

export const eventPublisherProvider = {
  provide: 'eventPublisher',
  useFactory: async () => {
    if (!publisher) {
      if (promise) {
        return promise
      }

      promise = new Promise((resolve, reject) => {
        producer.on('ready', () => {
          ensureTopics().then(() => {
            resolve(new KafkaEventPublisher(topic, producer))
          }, reject)
        })
      })

      publisher = await promise
    }

    return publisher
  }
}

function ensureTopics() {
  logger.debug('ensureTopics', topic)

  return new Promise((resolve, reject) => {
    client.createTopics(
      [
        {
          topic,
          partitions: 1,
          replicationFactor: 1
        }
      ],
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
}
