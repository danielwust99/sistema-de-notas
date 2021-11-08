import {
    Entity,
    Column,
    OneToMany,
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Notes } from "./Notes";

@Entity({ name: "usuarios" })
export class Users extends BaseEntity {
    @PrimaryColumn('uuid')
    uid?: string;

    @Column()
    nome: string;

    @Column()
    usuario: string;

    @Column()
    senha: string;

    @Column({ name: "created_at" })
    createdAt?: Date;

    @Column({ name: "updated_at" })
    updatedAt?: Date;

    @OneToMany(_ => Notes, (nota) => nota.usuario)
    notas?: Notes[];

    constructor(
        uid: string,
        nome: string,
        usuario: string,
        senha: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        super();
        this.uid = uid;
        this.nome = nome;
        this.usuario = usuario;
        this.senha = senha;
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
