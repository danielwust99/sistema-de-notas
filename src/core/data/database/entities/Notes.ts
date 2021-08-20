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

    @Column({ name: "usuario_uid" })
    usuarioUid: string;

    @Column({ name: "created_at" })
    createdAt?: Date;

    @Column({ name: "updated_at" })
    updatedAt?: Date;

    @OneToMany((type) => Users, (usuario) => usuario.notas)
    @JoinColumn({ name: "usuario_uid", referencedColumnName: "uid" })
    usuario?: Users;

    constructor(
        uid: string,
        descricao: string,
        detalhamento: string,
        usuarioUid: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        super();
        this.uid = uid;
        this.descricao = descricao;
        this.detalhamento = detalhamento;
        this.usuarioUid = usuarioUid;
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
