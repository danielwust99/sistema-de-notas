import { Users } from "../../../core/data/database/entities/Users";
import { Request, Response } from "express";

require("dotenv").config();
const secret: any = process.env.SECRET_HASH;

export default class Debug {
    public async index(req: Request, res: Response) {
        res.send(process.env.DB_TYPE)
        const user = await Users.findOne({
            where: {
                usuario: "user1",
            },
        });
        res.json(user);
    }
}
