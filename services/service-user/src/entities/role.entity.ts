import { ApiModelProperty } from '@nestjs/swagger'
import { Entity, Column, ManyToMany } from 'typeorm'

import { BaseEntity } from '@utils/typeorm'
import { User } from './user.entity'

@Entity()
export class Role extends BaseEntity {
  constructor() {
    super()
    this.status = 'active'
  }

  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '名称'
  })
  @Column({
    nullable: false
  })
  name: string

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

  @ManyToMany(type => User, user => user.roles)
  users: User[]
}
