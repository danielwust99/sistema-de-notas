import {
    Entity,
    BaseEntity,
    PrimaryColumn,
    Column,
    OneToMany,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Users } from "./Users";

@Entity({ name: "notas" })
export class Notes extends BaseEntity {
    @PrimaryColumn()
    uid?: string;

    @Column()
    descricao: string;

    @Column()
    detalhamento: string;

    @Column({ name: "usuarios_uid" })
    usuariosUID: string;

    @Column({ name: "created_at" })
    createdAt?: Date;

    @Column({ name: "updated_at" })
    updatedAt?: Date;

    @OneToMany((type) => Users, (usuarios) => usuarios.notas)
    @JoinColumn({ name: "usuarios_uid", referencedColumnName: "uid" })
    usuarios?: Users;

    constructor(
        uid: string,
        descricao: string,
        detalhamento: string,
        usuariosUID: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        super();
        this.uid = uid;
        this.descricao = descricao;
        this.detalhamento = detalhamento;
        this.usuariosUID = usuariosUID;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @BeforeInsert()
    private beforeInsert() {
        this.uid = this.uid ? this.uid : uuid();
        this.createdAt = this.createdAt ? this.createdAt : new Date(Date.now());
        this.updatedAt = this.updatedAt ? this.updatedAt : new Date(Date.now());
    }

    @BeforeUpdate()
    private beforeUpdate() {
        this.updatedAt = new Date(Date.now());
    }
}
