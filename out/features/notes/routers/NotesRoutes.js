"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NotesController_1 = __importDefault(require("../controllers/NotesController"));
const NotesIdentify_1 = __importDefault(require("../../notes/middlewares/NotesIdentify"));
const NoteInput_1 = __importDefault(require("../../notes/middlewares/NoteInput"));
const UsersLoginMiddleware_1 = __importDefault(require("../../login/middlewares/UsersLoginMiddleware"));
class NotesRoutes {
    init() {
        const routes = express_1.Router();
        const controller = new NotesController_1.default();
        routes.get("/notas/:uid/todas/", [UsersLoginMiddleware_1.default, NotesIdentify_1.default], controller.index);
        routes.get("/notas/:uid", [UsersLoginMiddleware_1.default, NotesIdentify_1.default], controller.show);
        routes.post("/notas/", [UsersLoginMiddleware_1.default, NoteInput_1.default], controller.store);
        routes.put("/notas/:uid", [UsersLoginMiddleware_1.default, NotesIdentify_1.default, NoteInput_1.default], controller.update);
        routes.delete("/notas/:uid", [UsersLoginMiddleware_1.default, NotesIdentify_1.default], controller.delete);
        return routes;
    }
}
exports.default = NotesRoutes;
