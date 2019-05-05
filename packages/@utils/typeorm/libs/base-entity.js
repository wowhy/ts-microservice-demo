"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const uuid = require("uuid/v1");
class BaseEntity {
    constructor() {
        this.id = uuid();
    }
}
__decorate([
    typeorm_1.PrimaryColumn({
        type: 'uuid'
    }),
    swagger_1.ApiModelProperty({
        type: 'string',
        required: false,
        description: 'ID'
    }),
    __metadata("design:type", String)
], BaseEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: false }),
    swagger_1.ApiModelProperty({
        type: 'string',
        required: false,
        description: '创建时间'
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ nullable: true }),
    swagger_1.ApiModelProperty({
        type: 'string',
        required: false,
        description: '修改时间'
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "updatedAt", void 0);
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base-entity.js.map