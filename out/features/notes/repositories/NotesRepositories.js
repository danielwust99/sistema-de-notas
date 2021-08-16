"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Notes_1 = require("../../../core/data/database/entities/Notes");
const uuid_1 = require("uuid");
class NotesRepository {
    async create(dados) {
        const { descricao, detalhamento, usuarioUid } = dados;
        const resultado = new Notes_1.Notes(uuid_1.v4(), descricao, detalhamento, usuarioUid).save();
        return Object.assign({}, dados, resultado);
    }
    async getAll(uid) {
        const notas = await Notes_1.Notes.find({ where: { usuarioUid: uid } });
        if (!notas) {
            return null;
        }
        return notas;
    }
    async getOne(uid) {
        const nota = await Notes_1.Notes.findOne(uid);
        if (!nota) {
            return null;
        }
        return nota;
    }
    async update(uid, dados) {
        const notaAlvo = await Notes_1.Notes.findOne(uid);
        if (!notaAlvo) {
            return null;
        }
        notaAlvo.descricao = dados.descricao;
        notaAlvo.detalhamento = dados.detalhamento;
        notaAlvo.save();
        return {
            uid: notaAlvo.uid,
            descricao: notaAlvo.descricao,
            detalhamento: notaAlvo.detalhamento,
            usuarioUid: notaAlvo.usuarioUid,
        };
    }
    //testar resultado
    async delete(uid) {
        const notaAlvo = await this.getOne(uid);
        if (!notaAlvo) {
            return false;
        }
        return true;
    }
    async deleteAll(uid) {
        const notasAlvo = await this.getAll(uid);
        if (!notasAlvo) {
            return false;
        }
        for (let nota in notasAlvo) {
            await Notes_1.Notes.delete(nota[0]);
        }
        return true;
    }
}
exports.default = NotesRepository;
