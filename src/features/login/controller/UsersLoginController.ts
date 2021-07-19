import { Users } from "../../../core/data/database/entities/Users";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

require("dotenv").config();
const secret: any = process.env.SECRET_HASH;

export default class UsersLoginController {
    public async login(req: Request, res: Response) {
        const user = await Users.findOne({
            where: {
                usuario: req.body.usuario,
            },
        });

        if (!user) {
            return res.json({ erro: "Usuario não encontrado" });
        } else {
            const validaSenha = await bcrypt.compare(
                req.body.senha,
                user.senha
            );
            if (!validaSenha) {
                return res.json({ erro: "Senha invalida!" });
            }
        }

        const token = jwt.sign(
            {
                uid: user.uid,
            },
            secret,
            { expiresIn: 3000 }
        );

        const sessao = {
            uid: user.uid,
            nome: user.nome,
            usuario: user.usuario,
            token,
        };

        res.json(sessao);
    }
}
