"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NoteInput_1 = require("../../notes/middlewares/NoteInput");
const repositories_1 = require("../../../core/data/repositories");
const NotesRepositories_1 = __importDefault(require("../repositories/NotesRepositories"));
const NotesController_1 = __importDefault(require("../controllers/NotesController"));
const core_1 = require("../../../core");
const core_2 = require("../../../core");
const controlador = () => {
    const repo = new NotesRepositories_1.default();
    const cache = new repositories_1.CacheRepository();
    return new NotesController_1.default(repo, cache);
};
class NotesRoutes {
    init(routes) {
        routes.get("/notas/:uid/todas", [
        // middlewareAdapter(new UsersLoginMiddleware()),
        ], core_1.routerMvcAdapter(controlador(), core_1.EMVC.INDEX));
        routes.get("/notas/:uid", [
        // middlewareAdapter(new UsersLoginMiddleware()),
        ], core_1.routerMvcAdapter(controlador(), core_1.EMVC.SHOW));
        routes.post("/notas/", [
            core_2.middlewareAdapter(new NoteInput_1.NoteInputMiddleware()),
            // middlewareAdapter(new UsersLoginMiddleware()),
        ], core_1.routerMvcAdapter(controlador(), core_1.EMVC.STORE));
        routes.put("/notas/:uid", [
        // middlewareAdapter(new NoteInputMiddleware()),
        // middlewareAdapter(new UsersLoginMiddleware()),
        ], core_1.routerMvcAdapter(controlador(), core_1.EMVC.UPDATE));
        routes.delete("/notas/:uid", [
        // middlewareAdapter(new UsersLoginMiddleware()),
        ], core_1.routerMvcAdapter(controlador(), core_1.EMVC.DELETE));
        routes.delete("/notas/:uid/todas", [
        // middlewareAdapter(new UsersLoginMiddleware()),
        ], core_1.routerMvcAdapter(controlador(), core_1.EMVC.DELETEALL));
    }
}
exports.default = NotesRoutes;
