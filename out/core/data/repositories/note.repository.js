"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteRepository = void 0;
const Notes_1 = require("../database/entities/Notes");
class NoteRepository {
    async getOne(uid) {
        const nota = await Notes_1.Notes.findOne(uid);
        if (!nota) {
            return null;
        }
        return nota;
    }
}
exports.NoteRepository = NoteRepository;
