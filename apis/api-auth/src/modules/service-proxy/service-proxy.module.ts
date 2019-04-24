import { Module } from '@nestjs/common'
import { UserServiceProxy } from './user-proxy'

@Module({
  providers: [UserServiceProxy],
  exports: [UserServiceProxy]
})
export class ServiceProxyModule {}
