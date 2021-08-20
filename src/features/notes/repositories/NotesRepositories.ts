import { Notes } from "../../../core/data/database/entities/Notes";
import { v4 as uuid } from "uuid";

export default class NotesRepository {
    async create(dados: Notes): Promise<Notes> {
        const { descricao, detalhamento, usuarioUid } = dados;
        const resultado = new Notes(
            uuid(),
            descricao,
            detalhamento,
            usuarioUid
        ).save();

        return Object.assign({}, dados, resultado);
    }

    async getAll(uid: string): Promise<Notes[] | null> {
        const notas = await Notes.find({ where: { usuarioUid: uid } });

        if (!notas) {
            return null;
        }

        return notas;
    }

    async getOne(uid: string): Promise<Notes | null> {
        const nota = await Notes.findOne(uid);
        
        if (!nota) {
            return null;
        }
        return nota;
    }

    async update(uid: string, dados: Notes): Promise<any> {
        const notaAlvo = await Notes.findOne(uid);

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

    async delete(uid: string): Promise<string | false> {
        const notaAlvo = await this.getOne(uid);

        if (!notaAlvo) {
            return false;
        }

        await Notes.delete(uid);

        return notaAlvo.usuarioUid;
    }

    async deleteAll(uid: string): Promise<boolean> {
        const notasAlvo = await this.getAll(uid);

        if (!notasAlvo) {
            return false;
        }

        for (let nota in notasAlvo) {
            await Notes.delete(nota[0]);
        }

        return true;
    }
}
