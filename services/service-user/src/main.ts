import { NestFactory } from '@nestjs/core'
import { bootstrap } from '@utils/bootstrap'

import { appConfig } from './config/app.config'

import { AppModule } from './app.module'
import { docsProvider } from './providers/document.providers'

async function main() {
  const app = await NestFactory.create(AppModule)
  await bootstrap(app, {
    port: appConfig.port,
    documentProviders: docsProvider
  })
}

main()
