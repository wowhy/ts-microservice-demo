import { bootstrap } from '@utils/bootstrap'

import { appConfig } from './config/app.config'

import { AppModule } from './app.module'
import { docsProvider } from './providers/document.providers'

bootstrap(AppModule, {
  port: appConfig.port,
  documentProviders: docsProvider
})
