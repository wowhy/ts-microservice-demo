import { Module, OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { register } from '../../providers/agenda.provider'
import { RemoveUserTokenHandler } from './remove-user-token.handler'

@Module({
  providers: [RemoveUserTokenHandler]
})
export class UserModule implements OnModuleInit {
  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    register(RemoveUserTokenHandler.jobName, this.moduleRef, RemoveUserTokenHandler)
  }
}
