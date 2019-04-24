import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Role } from '../../entities/role.entity'

import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { eventPublisherProvider } from '../../providers/event-publisher.provider'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService, eventPublisherProvider]
})
export class RoleModule {}
