"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UsersController_repo;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../core");
class UsersController {
    constructor(repo) {
        _UsersController_repo.set(this, void 0);
        __classPrivateFieldSet(this, _UsersController_repo, repo, "f");
    }
    async store(req) {
        try {
            const novoUsuario = await __classPrivateFieldGet(this, _UsersController_repo, "f").create(req.body);
            return core_1.ok(novoUsuario);
        }
        catch {
            return core_1.serverError();
        }
    }
    async show(req) {
        try {
            const usuario = await __classPrivateFieldGet(this, _UsersController_repo, "f").getOne(req.params.uid);
            if (!usuario) {
                return core_1.notFound();
            }
            return core_1.ok(usuario);
        }
        catch {
            return core_1.serverError();
        }
    }
    async update(req) {
        try {
            const usuario = await __classPrivateFieldGet(this, _UsersController_repo, "f").update(req.params.uid, req.body);
            return core_1.ok(usuario);
        }
        catch {
            return core_1.serverError();
        }
    }
    async delete(req) {
        try {
            await __classPrivateFieldGet(this, _UsersController_repo, "f").delete(req.params.uid);
            return core_1.ok({
                Mensagem: `Nota: ${req.params.uid} deletada com sucesso`,
            });
        }
        catch {
            return core_1.serverError();
        }
    }
    async login(req) {
        try {
            const validacao = await __classPrivateFieldGet(this, _UsersController_repo, "f").login(req.body);
            if (!validacao) {
                return core_1.notFound();
            }
            return core_1.ok(validacao);
        }
        catch {
            return core_1.serverError();
        }
    }
    async index() {
        return core_1.serverError();
    }
}
exports.default = UsersController;
_UsersController_repo = new WeakMap();
