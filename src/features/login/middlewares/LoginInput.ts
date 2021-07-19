import { Request, Response, NextFunction } from "express";

export default async function LoginInput(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { usuario, senha } = req.body;

    if (!usuario || usuario == "" || !senha || senha == "") {
        return res.json({ erro: "Dados Invalidos" });
    }
    next();
}
