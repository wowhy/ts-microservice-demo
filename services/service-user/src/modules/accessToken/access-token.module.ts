import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AccessToken } from '../../entities/access-token.entity'

import { AccessTokenController } from './access-token.controller'
import { AccessTokenService } from './access-token.service'
import { eventPublisherProvider } from '../../providers/event-publisher.provider'

@Module({
  imports: [TypeOrmModule.forFeature([AccessToken])],
  controllers: [AccessTokenController],
  providers: [AccessTokenService, eventPublisherProvider]
})
export class AccessTokenModule {}
