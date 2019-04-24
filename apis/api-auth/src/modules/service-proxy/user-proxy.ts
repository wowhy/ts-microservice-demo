import Axios, { AxiosRequestConfig } from 'axios'
import { serviceOptions, UserService, AccessTokenService } from './proxy/user.proxy'
import { HttpException, ServiceUnavailableException } from '@nestjs/common'
import { appConfig } from '../../config/app.config'
import * as jwt from 'jsonwebtoken'

function sign(payload: string | Object | Buffer, options?: jwt.SignOptions): string {
  return jwt.sign(payload, appConfig.jwtSecretKey, options)
}

serviceOptions.axios = Axios.create({
  baseURL: 'http://service-user:3000'
})

serviceOptions.axios.interceptors.request.use((config: AxiosRequestConfig & { user?: any }) => {
  if (config.user) {
    config.headers['Authorization'] = `Bearer ${sign(config.user)}`
  } else {
    config.headers['Authorization'] =
      'Bearer ' +
      sign({
        id: '00000000-0000-0000-0000-00000000000000',
        userName: 'admin',
        nickName: 'admin'
      })
  }

  return config
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
