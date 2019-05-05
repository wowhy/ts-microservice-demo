import { PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiModelProperty } from '@nestjs/swagger'
import * as uuid from 'uuid/v1'

export class BaseEntity {
  constructor() {
    this.id = uuid()
  }

  @PrimaryColumn({
    type: 'uuid'
  })
  @ApiModelProperty({
    type: 'string',
    required: false,
    description: 'ID'
  })
  id: string

  @CreateDateColumn({ nullable: false })
  @ApiModelProperty({
    type: 'string',
    required: false,
    description: '创建时间'
  })
  createdAt: Date

  @UpdateDateColumn({ nullable: true })
  @ApiModelProperty({
    type: 'string',
    required: false,
    description: '修改时间'
  })
  updatedAt: Date
}
