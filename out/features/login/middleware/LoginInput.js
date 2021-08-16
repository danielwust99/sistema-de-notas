"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function LoginInput(req, res, next) {
    const { usuario, senha } = req.body;
    if (!usuario || usuario == "" || !senha || senha == "") {
        return res.json({ erro: "Dados Invalidos" });
    }
    next();
}
exports.default = LoginInput;
