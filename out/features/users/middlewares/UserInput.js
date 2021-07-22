"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function UserInput(req, res, next) {
    const { nome, usuario, senha } = req.body;
    if (!nome ||
        nome == "" ||
        !usuario ||
        usuario == "" ||
        !senha ||
        senha == "") {
        return res.json("Dados invalidos");
    }
    next();
}
exports.default = UserInput;
