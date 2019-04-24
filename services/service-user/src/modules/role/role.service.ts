import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RepositoryService } from '@nestjsx/crud/typeorm'

import { Role } from '../../entities/role.entity'

@Injectable()
export class RoleService extends RepositoryService<Role> {
  constructor(@InjectRepository(Role) repo) {
    super(repo)
  }
}
