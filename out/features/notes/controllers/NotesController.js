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
var _NotesController_repo, _NotesController_cache;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../core");
class NotesController {
    constructor(repo, cache) {
        _NotesController_repo.set(this, void 0);
        _NotesController_cache.set(this, void 0);
        __classPrivateFieldSet(this, _NotesController_repo, repo, "f");
        __classPrivateFieldSet(this, _NotesController_cache, cache, "f");
    }
    async index(req) {
        try {
            const cache = await __classPrivateFieldGet(this, _NotesController_cache, "f").get(`notas:${req.params.uid}`);
            if (cache) {
                return core_1.ok(cache);
            }
            const notas = await __classPrivateFieldGet(this, _NotesController_repo, "f").getAll(req.params.uid);
            if (!notas) {
                return core_1.notFound();
            }
            await __classPrivateFieldGet(this, _NotesController_cache, "f").set(`notas:${req.params.uid}`, notas);
            return core_1.ok(notas);
        }
        catch {
            return core_1.serverError();
        }
    }
    async show(req) {
        try {
            const cache = await __classPrivateFieldGet(this, _NotesController_cache, "f").get(`nota:${req.params.uid}`);
            if (cache) {
                return core_1.ok(cache);
            }
            const nota = await __classPrivateFieldGet(this, _NotesController_repo, "f").getOne(req.params.uid);
            if (!nota) {
                return core_1.notFound();
            }
            return core_1.ok(nota);
        }
        catch {
            return core_1.serverError();
        }
    }
    async store(req) {
        try {
            const novaNota = await __classPrivateFieldGet(this, _NotesController_repo, "f").create(req.body);
            await __classPrivateFieldGet(this, _NotesController_cache, "f").set(`nota:${req.body.usuarioUid}`, novaNota);
            await __classPrivateFieldGet(this, _NotesController_cache, "f").del(`notas:${req.body.usuarioUid}`);
            return core_1.ok(novaNota);
        }
        catch {
            return core_1.serverError();
        }
    }
    async update(req) {
        try {
            const { uid } = req.params;
            const notaAlvo = await __classPrivateFieldGet(this, _NotesController_repo, "f").update(uid, req.body);
            if (!notaAlvo) {
                return core_1.notFound();
            }
            await __classPrivateFieldGet(this, _NotesController_cache, "f").set(`nota:${uid}`, notaAlvo);
            await __classPrivateFieldGet(this, _NotesController_cache, "f").del(`notas:${notaAlvo.usuarioUid}`);
            return core_1.ok(notaAlvo);
        }
        catch {
            return core_1.serverError();
        }
    }
    async delete(req) {
        try {
            const notaAlvo = await __classPrivateFieldGet(this, _NotesController_repo, "f").delete(req.params.uid);
            await __classPrivateFieldGet(this, _NotesController_cache, "f").del(`nota:${req.params.uid}`);
            if (!notaAlvo) {
                return core_1.notFound();
            }
            return core_1.ok(notaAlvo);
        }
        catch {
            return core_1.serverError();
        }
    }
    async deleteAll(req) {
        try {
            const { uid } = req.params;
            const notasAlvo = await __classPrivateFieldGet(this, _NotesController_repo, "f").deleteAll(uid);
            await __classPrivateFieldGet(this, _NotesController_cache, "f").del(`notas:${uid}`);
            if (!notasAlvo) {
                return core_1.notFound();
            }
            return core_1.ok(notasAlvo);
        }
        catch {
            return core_1.serverError();
        }
    }
    async login() {
        return core_1.serverError();
    }
}
exports.default = NotesController;
_NotesController_repo = new WeakMap(), _NotesController_cache = new WeakMap();
