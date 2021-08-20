import { HttpResponse, InvalidParam, HttpRequest, badRequest, ok } from "../../../core";
import { Users } from "../../../core/data/database/entities";

export class LoginInputMiddleware {
    async handle(req: HttpRequest): Promise<HttpResponse> {
        const body: Users = req.body;
        const { usuario, senha } = body;

        if (!usuario || usuario == "" || !senha || senha == "") {
            return badRequest(new InvalidParam("dados invalidos"));
        }
        return ok({});
    }
}
