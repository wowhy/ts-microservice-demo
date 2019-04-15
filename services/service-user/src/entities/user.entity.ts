import { ApiModelProperty } from '@nestjs/swagger'
import { Entity, Column } from 'typeorm'

import { BaseEntity } from '@utils/typeorm'

@Entity()
export class User extends BaseEntity {
  constructor() {
    super()
  }

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '用户名'
  })
  @Column()
  userName: string

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '密码'
  })
  @Column()
  password: string

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: 'SALT'
  })
  @Column()
  salt: string

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '昵称'
  })
  @Column()
  nickName: string
}
