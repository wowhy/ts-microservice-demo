import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ServiceProxyModule } from '../service-proxy/service-proxy.module'
import { HttpStrategy } from './http.strategy'

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'bearer' }), ServiceProxyModule],
  controllers: [AuthController],
  providers: [AuthService, HttpStrategy]
})
export class AuthModule {}
