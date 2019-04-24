import { Injectable, BadRequestException } from '@nestjs/common'
import { UserServiceProxy } from '../service-proxy/user-proxy'

@Injectable()
export class AccountService {
  constructor(private readonly userServiceProxy: UserServiceProxy) {}

  async register(userName: string, rawPassword: string) {
    const [exists] = await this.userServiceProxy.UserService.getMany({
      id: '',
      filter: `userName||eq||${userName}`,
      limit: 1
    })

    if (exists) {
      throw new BadRequestException('用户名已被使用，无法注册')
    }

    const { data: salt } = await this.userServiceProxy.UserService.generateSalt()
    const { data: nickName } = await this.userServiceProxy.UserService.generateNickName()
    const { data: password } = await this.userServiceProxy.UserService.passwordHash({
      getPasswordHashDto: {
        password: rawPassword,
        salt
      }
    })

    await this.userServiceProxy.UserService.createOne({
      user: {
        userName,
        password,
        salt,
        nickName
      }
    } as any)

    return true
  }
}
