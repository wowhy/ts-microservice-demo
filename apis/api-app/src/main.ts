import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ValidationPipe } from '@nestjs/common'
import { bootstrap } from '@utils/bootstrap'

import { appConfig } from './config/app.config'

import { AppModule } from './app.module'
import { docsProvider } from './providers/document.providers'

async function main() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('/api')
  await bootstrap(app, {
    port: appConfig.port,
    documentProviders: docsProvider
  })
}

main()
