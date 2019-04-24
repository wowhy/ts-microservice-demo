const uuid = require('uuid')
const { PrimaryColumn, CreateDateColumn, UpdateDateColumn } = require('typeorm')
const { ApiModelProperty } = require('@nestjs/swagger')

class BaseEntity {
  constructor() {
    this.id = uuid.v4()
  }
}

Reflect.decorate(
  [
    PrimaryColumn({
      type: 'uuid'
    }),
    ApiModelProperty({
      type: 'string',
      required: false,
      description: 'ID'
    }),
    Reflect.metadata('design:type', String)
  ],
  BaseEntity.prototype,
  'id'
)
Reflect.decorate(
  [
    CreateDateColumn({ nullable: false }),
    ApiModelProperty({
      type: 'string',
      required: false,
      description: '创建时间'
    }),
    Reflect.metadata('design:type', Object)
  ],
  BaseEntity.prototype,
  'createdAt'
)
Reflect.decorate(
  [
    UpdateDateColumn({ nullable: true }),
    ApiModelProperty({
      type: 'string',
      required: false,
      description: '修改时间'
    }),
    Reflect.metadata('design:type', Object)
  ],
  BaseEntity.prototype,
  'updatedAt'
)

exports.BaseEntity = BaseEntity
