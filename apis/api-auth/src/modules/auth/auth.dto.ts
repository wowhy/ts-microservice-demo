import { IsNotEmpty } from 'class-validator'

export class CreateTokenDto {
  @IsNotEmpty()
  userName: string

  @IsNotEmpty()
  password: string
}
