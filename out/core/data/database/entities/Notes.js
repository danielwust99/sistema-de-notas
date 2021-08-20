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
exports.Notes = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Users_1 = require("./Users");
let Notes = class Notes extends typeorm_1.BaseEntity {
    constructor(uid, descricao, detalhamento, usuarioUid, createdAt, updatedAt) {
        super();
        this.uid = uid;
        this.descricao = descricao;
        this.detalhamento = detalhamento;
        this.usuarioUid = usuarioUid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    beforeInsert() {
        this.uid = this.uid ? this.uid : uuid_1.v4();
        this.createdAt = this.createdAt ? this.createdAt : new Date(Date.now());
        this.updatedAt = this.updatedAt ? this.updatedAt : new Date(Date.now());
    }
    beforeUpdate() {
        this.updatedAt = new Date(Date.now());
    }
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Notes.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Notes.prototype, "descricao", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Notes.prototype, "detalhamento", void 0);
__decorate([
    typeorm_1.Column({ name: "usuario_uid" }),
    __metadata("design:type", String)
], Notes.prototype, "usuarioUid", void 0);
__decorate([
    typeorm_1.Column({ name: "created_at" }),
    __metadata("design:type", Date)
], Notes.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ name: "updated_at" }),
    __metadata("design:type", Date)
], Notes.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Users_1.Users, (usuario) => usuario.notas),
    typeorm_1.JoinColumn({ name: "usuario_uid", referencedColumnName: "uid" }),
    __metadata("design:type", Users_1.Users)
], Notes.prototype, "usuario", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Notes.prototype, "beforeInsert", null);
__decorate([
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Notes.prototype, "beforeUpdate", null);
Notes = __decorate([
    typeorm_1.Entity({ name: "notas" }),
    __metadata("design:paramtypes", [String, String, String, String, Date,
        Date])
], Notes);
exports.Notes = Notes;
