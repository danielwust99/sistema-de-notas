import { Users } from "../../../core/data/database/entities/Users";
import { Request, Response } from "express";

require("dotenv").config();
const secret: any = process.env.SECRET_HASH;

export default class Debug {
    public async index(req: Request, res: Response) {
        const users = await Users.find();
        return res.json(users);
    }
}
