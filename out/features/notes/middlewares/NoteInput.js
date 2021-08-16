"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteInputMiddleware = void 0;
const core_1 = require("../../../core");
class NoteInputMiddleware {
    async handle(req) {
        const body = req.body;
        const { descricao, detalhamento, usuarioUid } = body;
        if (!descricao ||
            descricao == "" ||
            !detalhamento ||
            detalhamento == "" ||
            !usuarioUid ||
            usuarioUid == "") {
            return core_1.badRequest(new core_1.InvalidParam("dados invalidos"));
        }
        return core_1.ok({});
    }
}
exports.NoteInputMiddleware = NoteInputMiddleware;
