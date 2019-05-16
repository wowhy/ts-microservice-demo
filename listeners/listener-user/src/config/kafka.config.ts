import { env } from '@utils/env'
import { KafkaClientOptions, ConsumerGroupOptions } from 'kafka-node'

export const kafkaConfig: KafkaClientOptions = {
  kafkaHost: env.KAFKA_HOST,
  autoConnect: true,
  reconnectOnIdle: true,
  idleConnection: 10
}

export const consumerConfig: ConsumerGroupOptions = {
  kafkaHost: env.KAFKA_HOST,
  groupId: env.KAFKA_GROUP_ID
}

export const topics = ['user.event']
export const partitions = parseInt(env.KAFKA_PARTITIONS || '1', 10)
