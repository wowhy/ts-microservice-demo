import { ApiModelProperty } from '@nestjs/swagger'
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'

import { BaseEntity } from '@utils/typeorm'
import { Role } from './role.entity'

@Entity()
export class User extends BaseEntity {
  constructor() {
    super()
    this.status = 'active'
  }

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '用户名'
  })
  @Column({
    unique: true,
    nullable: false
  })
  userName: string

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '密码'
  })
  @Column({
    nullable: false
  })
  password: string

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: 'SALT'
  })
  @Column({
    nullable: false
  })
  salt: string

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '昵称'
  })
  @Column({
    nullable: false
  })
  nickName: string

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '状态'
  })
  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    nullable: false,
    default: 'active'
  })
  status: 'active' | 'inactive'

  @ManyToMany(type => Role, role => role.users)
  @JoinTable({
    name: 'user_role'
  })
  roles: Role[]
}
