import Axios from 'axios'
import { serviceOptions, UserService, AccessTokenService } from './proxy/user.proxy'
import { HttpException, ServiceUnavailableException } from '@nestjs/common'

serviceOptions.axios = Axios.create({
  baseURL: 'http://service-user:3000'
})

serviceOptions.axios.interceptors.response.use(
  res => res,
  error => {
    if (error.response) {
      const { status, data } = error.response
      if (status === 503) {
        return Promise.reject(new ServiceUnavailableException())
      }

      return Promise.reject(new HttpException(data, status))
    }

    return Promise.reject(new ServiceUnavailableException())
  }
)

export class UserServiceProxy {
  public readonly UserService = new UserService()
  public readonly AccessTokenService = new AccessTokenService()
}
