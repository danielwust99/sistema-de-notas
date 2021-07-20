import { Request, Response } from "express";
import { Users } from "../../../core/data/database/entities/Users";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export default class UsersController {
    public async show(req: Request, res: Response) {
        const { uid } = req.params;
        const user = await Users.findOne(uid);

        return res.json(user);
    }

    public async store(req: Request, res: Response) {
        const { nome, usuario, senha } = req.body;
        const users = await new Users(
            uuid(),
            nome,
            usuario,
            bcrypt.hashSync(senha, 8)
        ).save();

        return res.json(users);
    }

    public async update(req: Request, res: Response) {
        const { uid } = req.params;
        const { nome, usuario, senha } = req.body;

        const users = await Users.findOne(uid);

        if (users) {
            users.nome = nome;
            users.usuario = usuario;
            users.senha = bcrypt.hashSync(senha, 8);
            users.save();
        }

        return res.json(users);
    }

    public async delete(request: Request, response: Response) {
        const { uid } = request.params;

        await Users.delete(uid);

        return response.sendStatus(204);
    }

    //DEBUG
    public async all(req: Request, res: Response) {
        const users = await Users.find();
        if (!users) {
            res.status(404).json({ erro: "Sem dados" });
        }
        return res.json(users);
    }
}
