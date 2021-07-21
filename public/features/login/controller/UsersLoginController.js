"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = require("../../../core/data/database/entities/Users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
const secret = process.env.SECRET_HASH;
class UsersLoginController {
    async login(req, res) {
        const user = await Users_1.Users.findOne({
            where: {
                usuario: req.body.usuario,
            },
        });
        if (!user) {
            return res.json({ erro: "Usuario não encontrado" });
        }
        else {
            const validaSenha = await bcrypt_1.default.compare(req.body.senha, user.senha);
            if (!validaSenha) {
                return res.json({ erro: "Senha invalida!" });
            }
        }
        const token = jsonwebtoken_1.default.sign({
            uid: user.uid,
        }, secret, { expiresIn: 3000 });
        const sessao = {
            uid: user.uid,
            nome: user.nome,
            usuario: user.usuario,
            token,
        };
        res.json(sessao);
    }
}
exports.default = UsersLoginController;
