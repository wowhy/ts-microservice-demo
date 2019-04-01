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

  Object.keys(jobs).forEach(key => {
    agenda.define(key, async job => {
      try {
        await jobs[key](job.attrs.data)
      } catch (ex) {
        logger.error(ex)
        job.fail(ex)
        await job.save()
      }
    })
  })

  process.on('SIGTERM', stop)
  process.on('SIGINT', stop)

  return new Promise((resolve, reject) => {
    // nothing
    logger.info('worker started')
  })
}

export function register(jobName, moduleRef: ModuleRef, type) {
  const handler = data => {
    moduleRef.get(type).handler(data)
  }

  if (jobs[jobName]) {
    jobs[jobName].push(handler)
  } else {
    jobs[jobName] = [handler]
  }
}
