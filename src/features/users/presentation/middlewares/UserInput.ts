import { HttpResponse, InvalidParam, HttpRequest, badRequest, ok, } from "../../../../core";
import { Users } from "../../../../core";

export class UserInputMiddleware {
    async handle(req: HttpRequest): Promise<HttpResponse> {
        const body: Users = req.body;
        const { nome, usuario, senha } = body;

        if (
            !nome ||
            nome == "" ||
            !usuario ||
            usuario == "" ||
            !senha ||
            senha == ""
        ) {
            return badRequest(new InvalidParam("dados invalidos"));
        }
        return ok({});
    }
}
