import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

require("dotenv").config();
const secret: any = process.env.SECRET_HASH;

interface TokenPayload {
    uid: string;
    iat: number;
    exp: number;
}

export default function UsersLoginMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Sessão não iniciada" });
    }

    const token = authorization.replace("Bearer", "").trim();

    try {
        const data = jwt.verify(token, secret);

        const { uid } = data as TokenPayload;

        req.userUid = uid;

        return next();
    } catch {
        return res.sendStatus(401);
    }
}
