import { ApiModelProperty } from '@nestjs/swagger'
import { Entity, Column, ManyToMany } from 'typeorm'

import { BaseEntity } from '@utils/typeorm'

@Entity()
export class AccessToken extends BaseEntity {
  constructor() {
    super()
    this.scope = ''
  }

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '接口权限'
  })
  @Column({
    nullable: false,
    default: ''
  })
  scope: string

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '用户ID'
  })
  @Column({
    type: 'uuid',
    nullable: false
  })
  userId: string

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '访问令牌'
  })
  @Column({
    type: 'uuid',
    nullable: false
  })
  accessToken: string

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '访问令牌过期时间'
  })
  @Column({
    nullable: false
  })
  accessTokenExpiresAt: Date

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '刷新令牌'
  })
  @Column({
    type: 'uuid',
    nullable: false
  })
  refreshToken: string

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '刷新令牌过期时间'
  })
  @Column({
    nullable: false
  })
  refreshTokenExpiresAt: Date
}
