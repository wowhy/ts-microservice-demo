import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from '../../config/orm.config'
import { AccessToken } from '../../entities/access-token.entity'
import { AccessTokenService } from './access-token.service'
import { eventPublisherProvider } from '../../providers/event.publisher'

import { AccessTokenController } from './access-token.controller'

describe('AccessToken Controller', () => {
  let controller: AccessTokenController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), TypeOrmModule.forFeature([AccessToken])],
      controllers: [AccessTokenController],
      providers: [AccessTokenService, eventPublisherProvider]
    }).compile()

    controller = module.get<AccessTokenController>(AccessTokenController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
