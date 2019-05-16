import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ValidationPipe } from '@nestjs/common'
import { bootstrap } from '@utils/bootstrap'

import { appConfig } from './config/app.config'

import { AppModule } from './app.module'
import { docsProvider } from './providers/document.providers'

import { readFileSync } from 'fs'
import { join } from 'path'

async function main() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      https: {
        allowHTTP1: true,
        key: readFileSync(join(process.cwd(), '/secrets/private.key')),
        cert: readFileSync(join(process.cwd(), '/secrets/public.crt'))
      },
      http2: true
    })
  )
  app.useGlobalPipes(new ValidationPipe())
  await bootstrap(app, {
    port: appConfig.port,
    documentProviders: docsProvider
  })
}

main()
