"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = require("../../../core/data/database/entities/Users");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UsersController {
    async show(req, res) {
        const { uid } = req.params;
        const user = await Users_1.Users.findOne(uid);
        return res.json(user);
    }
    async store(req, res) {
        const { nome, usuario, senha } = req.body;
        const users = await new Users_1.Users(uuid_1.v4(), nome, usuario, bcrypt_1.default.hashSync(senha, 8)).save();
        return res.json(users);
    }
    async update(req, res) {
        const { uid } = req.params;
        const { nome, usuario, senha } = req.body;
        const users = await Users_1.Users.findOne(uid);
        if (users) {
            users.nome = nome;
            users.usuario = usuario;
            users.senha = bcrypt_1.default.hashSync(senha, 8);
            users.save();
        }
        return res.json(users);
    }
    async delete(request, response) {
        const { uid } = request.params;
        await Users_1.Users.delete(uid);
        return response.sendStatus(204);
    }
    //DEBUG
    async all(req, res) {
        const users = await Users_1.Users.find();
        if (!users) {
            res.json({ erro: "Sem dados" });
        }
        return res.json(users);
    }
}
exports.default = UsersController;
