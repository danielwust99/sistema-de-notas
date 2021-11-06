import {
    HttpResponse,
    InvalidParam,
    HttpRequest,
    badRequest,
    notFound,
    ok,
} from "../../../../core";
import { Notes } from "../../../../core";
import { Users } from "../../../../core";

export class NoteInputMiddleware {
    async handle(req: HttpRequest): Promise<HttpResponse> {
        const body: Notes = req.body;
        const { descricao, detalhamento, usuarioUid } = body;

        if (
            !descricao ||
            descricao == "" ||
            !detalhamento ||
            detalhamento == "" ||
            !usuarioUid ||
            usuarioUid == ""
        ) {
            return badRequest(new InvalidParam("dados invalidos"));
        } else {
            const usuario = await Users.findOne(usuarioUid);
            
            if (!usuario) {
                return notFound();
            }
        }

        return ok({});
    }
}
