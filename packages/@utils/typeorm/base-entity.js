const uuid = require("uuid");
const { PrimaryColumn, CreateDateColumn, UpdateDateColumn } = require('typeorm')
const { ApiModelProperty } = require('@nestjs/swagger')

class BaseEntity {
  constructor() {
    this.id = uuid.v4();
  }
}

Reflect.decorate(
  [
    PrimaryColumn(),
    ApiModelProperty({
      type: 'string',
      required: true,
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
      required: true,
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
