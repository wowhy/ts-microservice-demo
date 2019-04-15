import { Module } from '@nestjs/common'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { ServiceProxyModule } from '../service-proxy/service-proxy.module'

@Module({
  imports: [ServiceProxyModule],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
