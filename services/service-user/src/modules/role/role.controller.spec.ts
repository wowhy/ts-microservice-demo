import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from '../../config/orm.config'
import { Role } from '../../entities/role.entity'
import { RoleService } from './role.service'
import { eventPublisherProvider } from '../../providers/event.publisher'

import { RoleController } from './role.controller'

describe('Role Controller', () => {
  let controller: RoleController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), TypeOrmModule.forFeature([Role])],
      controllers: [RoleController],
      providers: [RoleService, eventPublisherProvider]
    }).compile()

    controller = module.get<RoleController>(RoleController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
