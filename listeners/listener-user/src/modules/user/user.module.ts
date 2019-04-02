import { Module, OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { register } from '../../providers/kafka.provider'
import { UserCreatedHandler } from './user-created.handler'

@Module({
  providers: [UserCreatedHandler]
})
export class UserModule implements OnModuleInit {
  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    register(UserCreatedHandler.topic, this.moduleRef, UserCreatedHandler)
  }
}
