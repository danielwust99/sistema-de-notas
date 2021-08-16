"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const Users_1 = require("../database/entities/Users");
class UserRepository {
    async getOne(uid) {
        const usuario = await Users_1.Users.findOne(uid);
        if (!usuario) {
            return null;
        }
        return usuario;
    }
}
exports.UserRepository = UserRepository;
