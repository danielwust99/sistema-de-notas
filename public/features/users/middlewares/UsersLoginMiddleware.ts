import { HttpResponse, HttpMiddleware, unauthorized, Unauthorized, HttpRequest, badRequest, ok } from "../../../core";
import jwt from "jsonwebtoken";

require("dotenv").config();
const secret: any = process.env.SECRET_HASH;

interface TokenPayload {
    uid: string;
    iat: number;
    exp: number;
}

export class UsersLoginMiddleware {
    async handle(req: HttpMiddleware): Promise<HttpResponse> {
        const { authorization } = req.headers;

        if (!authorization) {
            return unauthorized(new Unauthorized("Sessão Invalida"));
        }

        const token = authorization.replace("Bearer", "").trim();

        try {
            const data = jwt.verify(token, secret);

            const { uid } = data as TokenPayload;

            req.headers.userUid = uid;

            return ok({});
        } catch {
            return unauthorized(new Unauthorized("Sessão Invalida"));
        }
    }
}
