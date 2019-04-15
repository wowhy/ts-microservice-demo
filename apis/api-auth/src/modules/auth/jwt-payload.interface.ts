export interface JwtPayload {
  type: 'user' | 'admin'
  id: string
  userName: string
  nickName: string
}
