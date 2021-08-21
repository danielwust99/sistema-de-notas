import { UserNotExistMiddleware } from "../../users/middlewares/UserNotExist";
import { UsersLoginMiddleware } from "../../users/middlewares/UsersLoginMiddleware";
import { NoteInputMiddleware } from "../../notes/middlewares/NoteInput";
import { CacheRepository } from "../../../core/data/repositories";
import NotesRepository from "../repositories/NotesRepositories";
import NotesController from "../controllers/NotesController";
import { MVCController } from "../../../core/contracts";
import { EMVC, routerMvcAdapter } from "../../../core";
import { middlewareAdapter } from "../../../core";
import { Router } from "express";

const controlador = (): MVCController => {
    const repo = new NotesRepository();
    const cache = new CacheRepository();

    return new NotesController(repo, cache);
};

export default class NotesRoutes {
    public init(routes: Router) {
        routes.get(
            "/notas/:uid/todas",
            [
                // middlewareAdapter(new UsersLoginMiddleware()),
            ],
            routerMvcAdapter(controlador(), EMVC.INDEX)
        );
        routes.get(
            "/notas/:uid",
            [
                // middlewareAdapter(new UsersLoginMiddleware()),
            ],
            routerMvcAdapter(controlador(), EMVC.SHOW)
        );
        routes.post(
            "/notas/",
            [
                middlewareAdapter(new UserNotExistMiddleware()),
                middlewareAdapter(new NoteInputMiddleware()),
                // middlewareAdapter(new UsersLoginMiddleware()),
            ],
            routerMvcAdapter(controlador(), EMVC.STORE)
        );
        routes.put(
            "/notas/:uid",
            [
                middlewareAdapter(new NoteInputMiddleware()),
                // middlewareAdapter(new UsersLoginMiddleware()),
            ],
            routerMvcAdapter(controlador(), EMVC.UPDATE)
        );
        routes.delete(
            "/notas/:uid",
            [
                // middlewareAdapter(new UsersLoginMiddleware()),
            ],
            routerMvcAdapter(controlador(), EMVC.DELETE)
        );
        routes.delete(
            "/notas/:uid/:limpar",
            [
                // middlewareAdapter(new UsersLoginMiddleware()),
            ],
            routerMvcAdapter(controlador(), EMVC.DELETE)
        );
    }
}
