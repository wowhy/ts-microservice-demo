import { KafkaClient, ConsumerGroup, KeyedMessage, Producer } from 'kafka-node'
import { ModuleRef } from '@nestjs/core'

import { SimpleEventDispatcher, KafkaEventSubscriber, KafkaMsgFailedHandler } from '@utils/event'
import { logger } from '@utils/logger'

import { kafkaConfig, topics, consumerConfig } from '../config/kafka.config'

const client = new KafkaClient(kafkaConfig)
const dispatcher = new SimpleEventDispatcher()

export function register(topic, moduleRef: ModuleRef, type) {
  dispatcher.register(topic, {
    moduleRef,
    type
  })
}

export function listen(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      client.on('ready', () => {
        logger.debug('ready?')
        ensureTopics().then(
          () => {
            receiveMsg()
          },
          err => {
            reject(err)
          }
        )
      })

      client.on('error', reject)
      client.on('close', resolve)

      process.on('SIGTERM', stop)
      process.on('SIGINT', stop)

      client.connect()
    } catch (err) {
      logger.error(err)
      reject(err)
    }
  })
}

function stop() {
  logger.debug('stop....')
  try {
    client.close()
  } catch (ex) {
    // nothing
  }

  process.exit(0)
}

function receiveMsg() {
  logger.debug('receive msg', consumerConfig.groupId)
  const consumer = new ConsumerGroup(
    {
      ...consumerConfig
    },
    topics
  )

  const subscriber = new KafkaEventSubscriber(
    consumer,
    dispatcher,
    new KafkaMsgFailedHandler(
      KeyedMessage,
      new Producer(client, {
        requireAcks: 1
      })
    )
  )
  subscriber.subscribe()
}

function ensureTopics() {
  const allTopcis = topics.concat(topics.map(topic => `error.${topic}`))
  logger.debug('ensureTopics', allTopcis)

  return new Promise((resolve, reject) => {
    client.createTopics(
      allTopcis.map(topic => ({
        topic,
        partitions: 1,
        replicationFactor: 1
      })),
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
