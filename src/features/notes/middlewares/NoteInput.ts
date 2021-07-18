import { Request, Response, NextFunction } from "express";

export default async function NoteInput(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { descricao, detalhamento, usuariosUID } = req.body;

    if (
        !descricao ||
        descricao == "" ||
        !detalhamento ||
        detalhamento == "" ||
        !usuariosUID ||
        usuariosUID == ""
    ) {
        return res.json("Dados invalidos");
    }
    next();
}
