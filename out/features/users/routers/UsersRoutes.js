"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersLoginMiddleware_1 = require("../middlewares/UsersLoginMiddleware");
const UserInput_1 = require("../../users/middlewares/UserInput");
const LoginInput_1 = require("../middlewares/LoginInput");
const UsersRepositories_1 = __importDefault(require("../repositories/UsersRepositories"));
const UsersController_1 = __importDefault(require("../controllers/UsersController"));
const core_1 = require("../../../core");
const core_2 = require("../../../core");
const controlador = () => {
    const repo = new UsersRepositories_1.default();
    return new UsersController_1.default(repo);
};
class UsersRoutes {
    init(routes) {
        routes.post("/login", [core_2.middlewareAdapter(new LoginInput_1.LoginInputMiddleware())], core_1.routerMvcAdapter(controlador(), core_1.EMVC.LOGIN));
        routes.post("/usuarios", [core_2.middlewareAdapter(new UserInput_1.UserInputMiddleware())], core_1.routerMvcAdapter(controlador(), core_1.EMVC.STORE));
        routes.get("/usuarios/:uid", [
            core_2.middlewareAdapter(new UsersLoginMiddleware_1.UsersLoginMiddleware()),
        ], core_1.routerMvcAdapter(controlador(), core_1.EMVC.SHOW));
        routes.put("/usuarios/:uid", [
            core_2.middlewareAdapter(new UserInput_1.UserInputMiddleware()),
            core_2.middlewareAdapter(new UsersLoginMiddleware_1.UsersLoginMiddleware()),
        ], core_1.routerMvcAdapter(controlador(), core_1.EMVC.UPDATE));
        routes.delete("/usuarios/:uid", [
            core_2.middlewareAdapter(new UsersLoginMiddleware_1.UsersLoginMiddleware()),
        ], core_1.routerMvcAdapter(controlador(), core_1.EMVC.DELETE));
    }
}
exports.default = UsersRoutes;
