import { RedisOptions } from 'ioredis'
import { env } from '@utils/env'

export const redisConfig: RedisOptions = {
  host: env.REDIS_HOST,
  port: 6379,
  password: env.REDIS_PASSWORD
}
