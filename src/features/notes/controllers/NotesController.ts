import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { Notes } from "../../../core/data/database/entities/Notes";

import Redis from "ioredis";
const redis = new Redis();

export default class NotesController {
    public async index(req: Request, res: Response) {
        const { uid } = req.params;

        redis.get(`Notas:${uid}`, async function (err, result) {
            if (result) {
                return res.json(JSON.parse(result));
            } else {
                const notas = await Notes.find({ where: { usuariosUID: uid } });

                redis.set(`Notas:${uid}`, JSON.stringify(notas));

                return res.json(notas);
            }
        });
    }

    public async show(req: Request, res: Response) {
        const { uid } = req.params;

        redis.get(`Nota:${uid}`, async function (err, result) {
            if (result) {
                return res.json(JSON.parse(result));
            } else {
                const nota = await Notes.findOne(uid);

                redis.set(`Nota:${uid}`, JSON.stringify(nota));

                return res.json(nota);
            }
        });
    }

    public async store(req: Request, res: Response) {
        const { descricao, detalhamento, usuariosUID } = req.body;
        const user = await new Notes(
            uuid(),
            descricao,
            detalhamento,
            usuariosUID
        ).save();

        redis.del(`Notas:${usuariosUID}`)

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
        redis.set(`Nota:${uid}`, JSON.stringify(nota));

        return res.json(nota);
    }

    public async delete(request: Request, response: Response) {
        const { uid } = request.params;

        await Notes.delete(uid);

        return response.sendStatus(204);
    }

    public async deleteAll(request: Request, response: Response) {
        const { uid } = request.params;
        const notas = await Notes.find({ where: { usuariosUID: uid } });

        for (let nota in notas) {
            let qual: any = notas[nota].uid;
            await Notes.delete(qual);
        }

        redis.del(`Notas:${uid}`)

        return response.sendStatus(204);
    }
}
