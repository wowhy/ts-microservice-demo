import { ModuleRef } from '@nestjs/core'

import { logger } from '@utils/logger'

import { KafkaClient, ConsumerGroup } from 'kafka-node'
import { kafkaConfig, topics, consumerConfig } from '../config/kafka.config'

const client = new KafkaClient(kafkaConfig)
const routes = {}

export function register(topic, moduleRef: ModuleRef, type) {
  const handler = (topic, data) => {
    moduleRef.get(type).handler(topic, data)
  }

  if (routes[topic]) {
    routes[topic].push(handler)
  } else {
    routes[topic] = [handler]
  }
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

  consumer.on('message', message => {
    try {
      logger.debug(message.topic, message.topic, message.partition, message.offset)

      if (!routes[message.topic]) {
        return
      }

      for (const handler of routes[message.topic]) {
        if (handler) {
          handler(message.topic, parseValue(message.value))
        }
      }

      // 考虑是否手动提交
      consumer.setOffset(message.topic, message.partition, message.offset + 1)

      consumer.commit(true, err => {
        if (err) {
          logger.error(err)
        }
      })
    } catch (err) {
      logger.error(err)
    }
  })
}

function ensureTopics() {
  logger.debug('ensureTopics', topics)

  return new Promise((resolve, reject) => {
    client.createTopics(
      topics.map(topic => ({
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
