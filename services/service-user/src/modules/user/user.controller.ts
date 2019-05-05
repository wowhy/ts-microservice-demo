import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { ApiUseTags, ApiOperation } from '@nestjs/swagger'
import { Crud } from '@nestjsx/crud'

import { User } from '../../entities/user.entity'
import { UserService } from './user.service'
import { GetPasswordHashDto, GenerateNickNameDto, GenerateSaltDto } from './user.dtos'
import { makeRouteOperationId } from '@utils/typeorm/libs/utils'
import { AuthGuard } from '@nestjs/passport'

@ApiUseTags('User')
@Crud(User, {
  routes: makeRouteOperationId({}),
  params: {
    id: 'uuid'
  }
})
@Controller('users')
@UseGuards(AuthGuard('jwt'))
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
