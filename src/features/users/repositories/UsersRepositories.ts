import { Users } from "../../../core/data/database/entities/Users";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

require("dotenv").config();
const secret: any = process.env.SECRET_HASH;

export default class UsersRepository {
    async create(dados: Users): Promise<Users> {
        const { nome, usuario, senha } = dados;

        const novoUsuario = await new Users(
            uuid(),
            nome,
            usuario,
            bcrypt.hashSync(senha, 8)
        ).save();

        return Object.assign({}, dados, novoUsuario);
    }

    async getOne(uid: string): Promise<Users> {
        const user = await Users.findOne(uid);

        if (!user) {
            throw new Error();
        }

        return user;
    }

    async update(uid: string, dados: Users): Promise<any> {
        const { nome, usuario, senha } = dados;

        const usuarioAlvo = await Users.findOne(uid);

        if (!usuarioAlvo) {
            return null;
        }

        usuarioAlvo.nome = nome;
        usuarioAlvo.usuario = usuario;
        usuarioAlvo.senha = bcrypt.hashSync(senha, 8);
        usuarioAlvo.save();

        return {
            uid: usuarioAlvo.uid,
            nome: usuarioAlvo.nome,
            usuario: usuarioAlvo.usuario,
        };
    }

    async delete(uid: string): Promise<boolean> {
        const usuarioAlvo = await Users.delete(uid);

        if (!usuarioAlvo) {
            return false;
        }

        return true;
    }

    async login(dados: Users): Promise<any> {
        const usuario = await Users.findOne({
            where: {
                usuario: dados.usuario,
            },
        });

        if (!usuario) {
            return null;
        } else {
            const validaSenha = await bcrypt.compare(
                dados.senha,
                usuario.senha
            );
            if (!validaSenha) {
                return { erro: "Senha invalida!" };
            }
        }

        const token = jwt.sign(
            {
                uid: usuario.uid,
            },
            secret,
            { expiresIn: 3000 }
        );

        const sessao = {
            uid: usuario.uid,
            nome: usuario.nome,
            usuario: usuario.usuario,
            token,
        };

        return sessao;
    }
}
