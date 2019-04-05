import { env } from '@utils/env'
import { KafkaClientOptions } from 'kafka-node'

export const kafkaConfig: KafkaClientOptions = {
  kafkaHost: env.KAFKA_HOST
}
