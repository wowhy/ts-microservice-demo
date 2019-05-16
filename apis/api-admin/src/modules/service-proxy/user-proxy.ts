import { serviceOptions, UserService, AccessTokenService } from './proxy/user.proxy'
import { createAxios } from './create-axios'

serviceOptions.axios = createAxios('https://service-user:3000')

export class UserServiceProxy {
  public readonly UserService = new UserService()
  public readonly AccessTokenService = new AccessTokenService()
}
