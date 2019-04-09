import Axios from 'axios'
import { UserServiceProxy, serviceOptions } from './proxy/user.proxy'

serviceOptions.axios = Axios.create({
  baseURL: 'http://service-user:3000'
})

export const userProxyFactory = {
  provide: 'UserServiceProxy',
  useFactory: () => {
    return new UserServiceProxy()
  }
}
