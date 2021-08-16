"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersLoginMiddleware = void 0;
const core_1 = require("../../../core");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const secret = process.env.SECRET_HASH;
class UsersLoginMiddleware {
    async handle(req) {
        const { authorization } = req.headers; // checar
        if (!authorization) {
            return core_1.unauthorized(new core_1.Unauthorized("Sessão Invalida"));
        }
        const token = authorization.replace("Bearer", "").trim();
        try {
            const data = jsonwebtoken_1.default.verify(token, secret);
            const { uid } = data;
            req.userUid = uid;
            return core_1.ok({});
        }
        catch {
            return core_1.unauthorized(new core_1.Unauthorized("Sessão Invalida"));
        }
    }
}
exports.UsersLoginMiddleware = UsersLoginMiddleware;
