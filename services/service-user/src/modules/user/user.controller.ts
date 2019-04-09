import { Controller } from '@nestjs/common'
import { ApiUseTags, ApiOperation } from '@nestjs/swagger'
import { Crud, RoutesOptions } from '@nestjsx/crud'

import { User } from '../../entities/user.entity'
import { UserService } from './user.service'

function makeRouteOperationId(routes: RoutesOptions) {
  const operationIds = {
    getManyBase: 'getMany',
    getOneBase: 'getOne',
    createOneBase: 'createOne',
    createManyBase: 'createMany',
    updateOneBase: 'updateOne',
    deleteOneBase: 'deleteOne'
  }
  ;['getManyBase', 'getOneBase', 'createOneBase', 'createManyBase', 'updateOneBase', 'deleteOneBase'].forEach(
    key => {
      if (!routes[key]) {
        routes[key] = {}
      }

      routes[key].decorators = (routes[key].decorators || []).concat(
        ApiOperation({
          title: '',
          operationId: operationIds[key]
        })
      )
    }
  )

  return routes
}

@ApiUseTags('User')
@Crud(User, {
  routes: makeRouteOperationId({}),
  params: {
    id: 'uuid'
  }
})
@Controller('users')
export class UserController {
  constructor(public service: UserService) {}
}
