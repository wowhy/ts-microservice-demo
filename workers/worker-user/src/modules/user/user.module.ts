import { Module, OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { register } from '../../providers/agenda.provider'
import { ServiceProxyModule } from '../service-proxy/service-proxy.module'
import { loadHandlers } from '../../utils/handler'

const handlers = loadHandlers(__dirname)

@Module({
  imports: [ServiceProxyModule],
  providers: handlers
})
export class UserModule implements OnModuleInit {
  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    handlers.forEach(handler => {
      register(handler.jobName, this.moduleRef, handler)
    })
  }
}
