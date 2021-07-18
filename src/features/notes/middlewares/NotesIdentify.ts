import { Request, Response, NextFunction } from "express";

export default async function UsersIdentify(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { uid } = req.params;

    if (!uid || uid == "") {
        return res.json("Identificador incorreto");
    }
    next();
}
