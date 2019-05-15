import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from '../../config/orm.config'
import { AccessToken } from '../../entities/access-token.entity'
import { AccessTokenService } from './access-token.service'
import { eventPublisherProvider } from '../../providers/event.publisher'

describe('AccessTokenService', () => {
  let service: AccessTokenService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), TypeOrmModule.forFeature([AccessToken])],
      providers: [AccessTokenService, eventPublisherProvider]
    }).compile()

    service = module.get<AccessTokenService>(AccessTokenService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
