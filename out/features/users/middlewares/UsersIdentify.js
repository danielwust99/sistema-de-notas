"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersIdentifyMiddleware = void 0;
const core_1 = require("../../../core");
class UsersIdentifyMiddleware {
    async handle(req) {
        const { uid } = req.params;
        if (!uid || uid == "") {
            return core_1.badRequest(new core_1.InvalidParam("identificador invalidos"));
        }
        return core_1.ok({});
    }
}
exports.UsersIdentifyMiddleware = UsersIdentifyMiddleware;
