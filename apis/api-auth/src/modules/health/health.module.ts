import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { PingCheckService } from './ping-check.service'
import { ServiceProxyModule } from '../service-proxy/service-proxy.module'

@Module({
  imports: [
    TerminusModule.forRootAsync({
      imports: [ServiceProxyModule],
      useClass: PingCheckService
    })
  ]
})
export class HealthModule {}
