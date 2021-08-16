import { HttpResponse, InvalidParam, HttpRequest, badRequest, ok } from "../../../core";
import { Notes } from "../../../core/data/database/entities";

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
        }
        return ok({});
    }
}
