import * as Agenda from 'agenda'
import { ModuleRef } from '@nestjs/core'

import { logger } from '@utils/logger'

import { mongoConfig } from '../config/mongo.config'

const agenda = new Agenda({
  db: mongoConfig
})

const jobs = {}

async function stop() {
  try {
    await agenda.stop()
    process.exit(0)
  } catch (ex) {
    logger.error(ex)
    process.exit(1)
  }
}

export async function listen() {
  await agenda.start()

  process.on('SIGTERM', stop)
  process.on('SIGINT', stop)

  Object.keys(jobs).forEach(key => {
    agenda.define(key, async (job, done) => {
      try {
        await jobs[key](job.attrs.data)
        done()
      } catch (ex) {
        logger.error(ex)
        done(ex)
      }
    })
  })

  return new Promise((resolve, reject) => {
    // nothing
    logger.info('worker started')
  })
}
export function register(jobName, moduleRef: ModuleRef, type) {
  const handler = data => {
    moduleRef.get(type).handler(data)
  }

  jobs[jobName] = handler
}
