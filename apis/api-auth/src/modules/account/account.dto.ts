import { IsNotEmpty } from 'class-validator'

export class RegisterDto {
  @IsNotEmpty()
  userName: string

  @IsNotEmpty()
  password: string
}
