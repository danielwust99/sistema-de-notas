import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { Notes } from "../../../core/data/database/entities/Notes";

export default class NotesController {
    public async index(req: Request, res: Response) {
        const { uid } = req.params;
        const notas = await Notes.find({ where: { usuariosUID: uid } });

        return res.json(notas);
    }

    public async show(req: Request, res: Response) {
        const { uid } = req.params;
        const nota = await Notes.findOne(uid);

        return res.json(nota);
    }

    public async store(req: Request, res: Response) {
        const { descricao, detalhamento, usuariosUID } = req.body;
        const user = await new Notes(
            uuid(),
            descricao,
            detalhamento,
            usuariosUID
        ).save();

        return res.json(user);
    }

    public async update(req: Request, res: Response) {
        const { uid } = req.params;
        const { descricao, detalhamento, usuariosUID } = req.body;

        const nota = await Notes.findOne(uid);

        if (nota) {
            nota.descricao = descricao;
            nota.detalhamento = detalhamento;
            nota.usuariosUID = usuariosUID;
            nota.save();
        }

        return res.json(nota);
    }

    public async delete(request: Request, response: Response) {
        const { uid } = request.params;

        await Notes.delete(uid);

        return response.sendStatus(204);
    }    
}
