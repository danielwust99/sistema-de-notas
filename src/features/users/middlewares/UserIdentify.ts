import { HttpResponse, InvalidParam, HttpRequest, badRequest, ok } from "../../../core";

export class UserIdentifyMiddleware {
    async handle(req: HttpRequest): Promise<HttpResponse> {
        const { uid } = req.params;

        if (!uid || uid == "") {
            return badRequest(new InvalidParam("identificador invalidos"));
        }
        return ok({});
    }
}
