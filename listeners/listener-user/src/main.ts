import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { listen } from './providers/event.subscriber'

async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule)
  await listen()
}

bootstrap()
