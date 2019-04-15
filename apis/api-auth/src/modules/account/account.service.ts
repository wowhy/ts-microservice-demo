import { Injectable, Inject, BadRequestException } from '@nestjs/common'
import { UserServiceProxy } from '../service-proxy/proxy/user.proxy'

@Injectable()
export class AccountService {
  constructor(private readonly userServiceProxy: UserServiceProxy) {}

  async register(userName: string, rawPassword: string) {
    const [exists] = await this.userServiceProxy.getMany({
      id: '',
      filter: `userName||eq||${userName}`,
      limit: 1
    })

    if (exists) {
      throw new BadRequestException('用户名已被使用，无法注册')
    }

    const { data: salt } = await this.userServiceProxy.generateSalt()
    const { data: nickName } = await this.userServiceProxy.generateNickName()
    const { data: password } = await this.userServiceProxy.passwordHash({
      getPasswordHashDto: {
        password: rawPassword,
        salt
      }
    })

    await this.userServiceProxy.createOne({
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
