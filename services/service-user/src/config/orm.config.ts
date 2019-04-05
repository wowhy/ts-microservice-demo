import { join } from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { env } from '@utils/env'

import { redisConfig } from './redis.config'

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.PG_HOST,
  port: 3306,
  username: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_DB,
  // synchronize: true,
  synchronize: false,
  logging: true,
  cache: {
    type: 'ioredis',
    options: redisConfig
  },
  entities: [join(__dirname, '../entities/**/*.entity{.ts,.js}')]
}
