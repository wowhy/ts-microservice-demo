import { Controller, Post, Body, Get } from '@nestjs/common'
import { ApiUseTags, ApiOperation } from '@nestjs/swagger'
import { Crud, RoutesOptions } from '@nestjsx/crud'

import { User } from '../../entities/user.entity'
import { UserService } from './user.service'
import { GetPasswordHashDto, GenerateNickNameDto, GenerateSaltDto } from './user.dtos'

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
        routes[key] = {
          allowParamsOverride: true
        }
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

  @Post('password-hash')
  @ApiOperation({
    title: 'passwordHash',
    operationId: 'passwordHash'
  })
  async passwordHash(@Body() { password, salt }: GetPasswordHashDto) {
    return {
      data: await this.service.passwordHash(password, salt)
    }
  }

  @Post('generate-salt')
  @ApiOperation({
    title: 'generateSalt',
    operationId: 'generateSalt'
  })
  async generateSalt(@Body() {  }: GenerateSaltDto) {
    return {
      data: await this.service.generateSalt()
    }
  }

  @Post('generate-nick-name')
  @ApiOperation({
    title: 'generateNickName',
    operationId: 'generateNickName'
  })
  async generateNickName(@Body() {  }: GenerateNickNameDto) {
    return {
      data: await this.service.generateNickName()
    }
  }
}
