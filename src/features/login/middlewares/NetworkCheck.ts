import Database from "../../../core/data/connections/Database";
import { Request, Response, NextFunction } from "express";

require("dotenv").config();
const secret: any = process.env.SECRET_HASH;

export default async function NetworkCheck(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const testeRede = new Database().getConnection();

    if (testeRede == "Desconectado") {
        return res.json({
            erro: "Não conectado",
        });
    } else {
        next();
    }
}
