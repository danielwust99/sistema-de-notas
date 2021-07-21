"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Notes_1 = require("../../../core/data/database/entities/Notes");
class NotesController {
    async index(req, res) {
        const { uid } = req.params;
        const notas = await Notes_1.Notes.find({ where: { usuariosUID: uid } });
        return res.json(notas);
    }
    async show(req, res) {
        const { uid } = req.params;
        const nota = await Notes_1.Notes.findOne(uid);
        return res.json(nota);
    }
    async store(req, res) {
        const { descricao, detalhamento, usuariosUID } = req.body;
        const user = await new Notes_1.Notes(uuid_1.v4(), descricao, detalhamento, usuariosUID).save();
        return res.json(user);
    }
    async update(req, res) {
        const { uid } = req.params;
        const { descricao, detalhamento, usuariosUID } = req.body;
        const nota = await Notes_1.Notes.findOne(uid);
        if (nota) {
            nota.descricao = descricao;
            nota.detalhamento = detalhamento;
            nota.usuariosUID = usuariosUID;
            nota.save();
        }
        return res.json(nota);
    }
    async delete(request, response) {
        const { uid } = request.params;
        await Notes_1.Notes.delete(uid);
        return response.sendStatus(204);
    }
}
exports.default = NotesController;
