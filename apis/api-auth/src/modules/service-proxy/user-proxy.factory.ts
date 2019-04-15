import Axios from 'axios'
import { UserServiceProxy, serviceOptions } from './proxy/user.proxy'
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

export const userProxyFactory = {
  provide: 'UserServiceProxy',
  useFactory: () => {
    return new UserServiceProxy()
  }
}
