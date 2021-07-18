import { Request, Response, NextFunction } from "express";

export default async function UserInput(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { nome, usuario, senha } = req.body;

    if (
        !nome ||
        nome == "" ||
        !usuario ||
        usuario == "" ||
        !senha ||
        senha == ""
    ) {
        return res.json("Dados invalidos");
    }
    next();
}
