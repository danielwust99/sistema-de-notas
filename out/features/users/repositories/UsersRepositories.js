"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = require("../../../core/data/database/entities/Users");
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
const secret = process.env.SECRET_HASH;
class UsersRepository {
    async create(dados) {
        const { nome, usuario, senha } = dados;
        const novoUsuario = await new Users_1.Users(uuid_1.v4(), nome, usuario, bcrypt_1.default.hashSync(senha, 8)).save();
        return Object.assign({}, dados, novoUsuario);
    }
    async getOne(uid) {
        const user = await Users_1.Users.findOne(uid);
        if (!user) {
            throw new Error();
        }
        return user;
    }
    async update(uid, dados) {
        const { nome, usuario, senha } = dados;
        const usuarioAlvo = await Users_1.Users.findOne(uid);
        if (!usuarioAlvo) {
            return null;
        }
        usuarioAlvo.nome = nome;
        usuarioAlvo.usuario = usuario;
        usuarioAlvo.senha = bcrypt_1.default.hashSync(senha, 8);
        usuarioAlvo.save();
        return {
            uid: usuarioAlvo.uid,
            nome: usuarioAlvo.nome,
            usuario: usuarioAlvo.usuario,
        };
    }
    //testar resultado
    async delete(uid) {
        const usuarioAlvo = await this.getOne(uid);
        if (!usuarioAlvo) {
            return false;
        }
        return true;
    }
    async login(uid, dados) {
        const usuario = await Users_1.Users.findOne({
            where: {
                usuario: dados.usuario,
            },
        });
        if (!usuario) {
            return null;
        }
        else {
            const validaSenha = await bcrypt_1.default.compare(dados.senha, usuario.senha);
            if (!validaSenha) {
                return { erro: "Senha invalida!" };
            }
        }
        const token = jsonwebtoken_1.default.sign({
            uid: usuario.uid,
        }, secret, { expiresIn: 3000 });
        const sessao = {
            uid: usuario.uid,
            nome: usuario.nome,
            usuario: usuario.usuario,
            token,
        };
        return sessao;
    }
}
exports.default = UsersRepository;
