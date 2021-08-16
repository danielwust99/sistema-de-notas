"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginInputMiddleware = void 0;
const core_1 = require("../../../core");
class LoginInputMiddleware {
    async handle(req) {
        const body = req.body;
        const { usuario, senha } = body;
        if (!usuario || usuario == "" || !senha || senha == "") {
            return core_1.badRequest(new core_1.InvalidParam("dados invalidos"));
        }
        return core_1.ok({});
    }
}
exports.LoginInputMiddleware = LoginInputMiddleware;
