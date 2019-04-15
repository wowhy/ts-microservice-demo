import { ApiModelProperty } from '@nestjs/swagger'

export class GetPasswordHashDto {
  @ApiModelProperty({
    type: 'string',
    required: true
  })
  password: string

  @ApiModelProperty({
    type: 'string',
    required: true
  })
  salt: string
}

export class GenerateNickNameDto {}

export class GenerateSaltDto {}
