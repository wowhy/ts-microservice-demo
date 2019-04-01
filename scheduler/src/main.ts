import * as express from 'express'
import * as Agenda from 'agenda'
import * as Agendash from 'agendash'

import { logger } from '@utils/logger'

import { appConfig } from './config/app.config'
import { mongoConfig } from './config/mongo.config'

const agenda = new Agenda({
  db: mongoConfig
})

const app = express()

async function schedule() {
  await agenda.start()

  // schedule jobs
  // await agenda.every('3 minutes', 'delete old users');
}

async function bootstrap() {
  await schedule()

  app.use(Agendash(agenda))
  app.listen(appConfig.port, function() {
    logger.info('listening...')
  })
}

bootstrap()
