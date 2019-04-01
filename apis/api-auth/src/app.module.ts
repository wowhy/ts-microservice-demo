import { Module } from '@nestjs/common'
import { importModuleProviders } from './providers/module.providers'

@Module({
  imports: importModuleProviders
})
export class AppModule {}
