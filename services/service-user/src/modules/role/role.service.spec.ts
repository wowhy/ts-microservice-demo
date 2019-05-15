import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from '../../config/orm.config'
import { Role } from '../../entities/role.entity'
import { RoleService } from './role.service'
import { eventPublisherProvider } from '../../providers/event.publisher'

describe('RoleService', () => {
  let service: RoleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), TypeOrmModule.forFeature([Role])],
      providers: [RoleService, eventPublisherProvider]
    }).compile()

    service = module.get<RoleService>(RoleService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
