import { Module, OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { register } from '../../providers/event.subscriber'
import { loadHandlers } from '../../utils/handler'

const handlers = loadHandlers(__dirname)

@Module({
  providers: [...handlers]
})
export class UserModule implements OnModuleInit {
  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    handlers.forEach(handler => {
      register(handler.topic, this.moduleRef, handler)
    })
  }
}
