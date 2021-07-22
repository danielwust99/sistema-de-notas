"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function NoteInput(req, res, next) {
    const { descricao, detalhamento, usuariosUID } = req.body;
    if (!descricao ||
        descricao == "" ||
        !detalhamento ||
        detalhamento == "" ||
        !usuariosUID ||
        usuariosUID == "") {
        return res.json("Dados invalidos");
    }
    next();
}
exports.default = NoteInput;
