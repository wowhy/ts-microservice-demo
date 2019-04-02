import { env } from '@utils/env'
import { KafkaClientOptions, ConsumerGroupOptions } from 'kafka-node'

export const kafkaConfig: KafkaClientOptions = {
  kafkaHost: env.KAFKA_HOST
}

export const consumerConfig: ConsumerGroupOptions = {
  kafkaHost: env.KAFKA_HOST,
  groupId: env.KAFKA_GROUP_ID
}

export const topics = ['user.create']
export const partitions = parseInt(env.KAFKA_PARTITIONS || '1', 10)
