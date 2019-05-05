import { Controller } from '@nestjs/common'
import { ApiUseTags } from '@nestjs/swagger'
import { Crud } from '@nestjsx/crud'

import { Role } from '../../entities/role.entity'
import { RoleService } from './role.service'
import { makeRouteOperationId } from '@utils/typeorm/libs/utils'

@ApiUseTags('Role')
@Crud(Role, {
  routes: makeRouteOperationId({}),
  params: {
    id: 'uuid'
  }
})
@Controller('roles')
export class RoleController {
  constructor(public service: RoleService) {}
}
