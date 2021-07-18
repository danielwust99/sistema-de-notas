import { Router } from "express";
import NotesController from "../controllers/NotesController";
import NotesIdentify from '../../notes/middlewares/NotesIdentify';
import NoteInput from '../../notes/middlewares/NoteInput';

import UsersLoginMiddleware from "../../login/middlewares/UsersLoginMiddleware";

export default class NotesRoutes {
    public init(): Router {
        const routes = Router();
        const controller = new NotesController();

        routes.get("/notas/:uid/todas/", [UsersLoginMiddleware, NotesIdentify], controller.index);
        routes.get("/notas/:uid", [UsersLoginMiddleware, NotesIdentify], controller.show);
        routes.post("/notas/", [UsersLoginMiddleware, NoteInput], controller.store);
        routes.put("/notas/:uid", [UsersLoginMiddleware, NotesIdentify, NoteInput], controller.update);
        routes.delete("/notas/:uid", [UsersLoginMiddleware, NotesIdentify], controller.delete);
        
        //DEBUG
        // routes.get("/notas", controller.all);

        return routes;
    }
}
