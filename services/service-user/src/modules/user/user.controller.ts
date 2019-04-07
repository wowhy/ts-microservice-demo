import { Controller } from '@nestjs/common'
import { Crud } from '@nestjsx/crud'

import { User } from '../../entities/user.entity'
import { UserService } from './user.service'

@Crud(User, {
  params: {
    id: 'uuid'
  }
})
@Controller('users')
export class UserController {
  constructor(public service: UserService) {}
}
