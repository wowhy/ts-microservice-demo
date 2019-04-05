import { ApiModelProperty } from '@nestjs/swagger'
import { Entity, Column } from 'typeorm'

import { BaseEntity } from '@utils/typeorm'

@Entity()
export class User extends BaseEntity {
  @ApiModelProperty({
    type: 'string',
    required: true,
    description: '姓名'
  })
  @Column()
  name: string
}
