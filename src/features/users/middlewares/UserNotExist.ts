import {
    HttpResponse,
    InvalidParam,
    HttpRequest,
    badRequest,
    ok,
    notFound,
} from "../../../core";
import { Users } from "../../../core/data/database/entities";

export class UserNotExistMiddleware {
    async handle(req: HttpRequest): Promise<HttpResponse> {
        let erro;
        const uid = req.body.usuarioUid;

        if (!uid || uid == "") {
            return badRequest(new InvalidParam("dados invalidos"));
        } else {
            const pesquisa = await Users.findOne(uid)
            .catch((error) => { erro = error });

            if (pesquisa == null) {
                return notFound();
            }

            return ok({});
        }
    }
}
