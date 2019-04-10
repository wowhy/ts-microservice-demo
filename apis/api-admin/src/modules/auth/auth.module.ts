import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { HttpStrategy } from './http.strategy'

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'bearer' })],
  providers: [HttpStrategy]
})
export class AuthModule {}
