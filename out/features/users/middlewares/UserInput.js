"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInputMiddleware = void 0;
const core_1 = require("../../../core");
class UserInputMiddleware {
    async handle(req) {
        const body = req.body;
        const { nome, usuario, senha } = body;
        if (!nome ||
            nome == "" ||
            !usuario ||
            usuario == "" ||
            !senha ||
            senha == "") {
            return core_1.badRequest(new core_1.InvalidParam("dados invalidos"));
        }
        return core_1.ok({});
    }
}
exports.UserInputMiddleware = UserInputMiddleware;
