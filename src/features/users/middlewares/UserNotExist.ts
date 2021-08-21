import {
    HttpResponse,
    InvalidParam,
    HttpRequest,
    badRequest,
    notFound,
    ok,
} from "../../../core";
import { Users } from "../../../core/data/database/entities";

export class UserNotExistMiddleware {
    async handle(req: HttpRequest): Promise<HttpResponse> {
        const uid = req.body.usuarioUid;

        if (!uid || uid == "") {
            return badRequest(new InvalidParam("dados invalidos"));
        } else {
            const pesquisa = await Users.findOne(uid)
            .catch((error) => { let erro = error });

            if (pesquisa == null) {
                return notFound();
            }

            return ok({});
        }
    }
}
