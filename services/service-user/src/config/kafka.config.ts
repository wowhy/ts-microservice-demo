import { env } from '@utils/env'
import { KafkaClientOptions } from 'kafka-node'

export const kafkaConfig: KafkaClientOptions = {
  kafkaHost: env.KAFKA_HOST,
  autoConnect: true,
  reconnectOnIdle: true,
  idleConnection: 10
}

export const topic = 'user.event'
