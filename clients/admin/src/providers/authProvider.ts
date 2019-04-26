import { AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin'
import { request } from '../utils/request'

export default (type: string, params: any) => {
  if (type === AUTH_LOGIN) {
    return login(params)
  }
  if (type === AUTH_LOGOUT) {
    return logout(params)
  }
  if (type === AUTH_ERROR) {
    return error(params)
  }
  if (type === AUTH_CHECK) {
    return check(params)
  }
  if (type === AUTH_GET_PERMISSIONS) {
    return getPermissions(params)
  }

  return Promise.reject('Unknown method')
}

async function login({ username, password }: any) {
  const { accessToken, expiresIn } = await request('POST', '/api/auth/token', {
    grantType: 'password',
    userName: username,
    password
  })

  localStorage.setItem('token', accessToken)
  localStorage.setItem('expiresIn', expiresIn)
  localStorage.setItem('loginAt', String(+new Date()))
}

async function logout(params: any) {
  localStorage.clear()
}

async function error({ status }: any) {
  if (status === 401 || status === 403) {
    localStorage.clear()
    return Promise.reject(process.env.NODE_ENV === 'production' ? '/admin/#/Login' : undefined)
  }
  return Promise.resolve()
}

async function check(params: any) {
  return localStorage.getItem('token')
    ? Promise.resolve()
    : Promise.reject(process.env.NODE_ENV === 'production' ? '/admin/#/Login' : undefined)
}

async function getPermissions(params: any) {
  return 'admin'
}
