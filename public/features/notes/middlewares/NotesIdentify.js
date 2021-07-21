"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function UsersIdentify(req, res, next) {
    const { uid } = req.params;
    if (!uid || uid == "") {
        return res.json("Identificador incorreto");
    }
    next();
}
exports.default = UsersIdentify;
