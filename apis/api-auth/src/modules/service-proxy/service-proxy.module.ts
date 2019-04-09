import { Module } from '@nestjs/common'
import { userProxyFactory } from './user-proxy.factory'

@Module({
  providers: [userProxyFactory],
  exports: [userProxyFactory]
})
export class ServiceProxyModule {}
