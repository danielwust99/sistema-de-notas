"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersLoginController_1 = __importDefault(require("../../login/controller/UsersLoginController"));
const UsersLoginMiddleware_1 = __importDefault(require("../../login/middlewares/UsersLoginMiddleware"));
const UsersIdentify_1 = __importDefault(require("../../users/middlewares/UsersIdentify"));
// import NetworkCheck from "../../login/middlewares/NetworkCheck";
const UsersController_1 = __importDefault(require("../controllers/UsersController"));
const LoginInput_1 = __importDefault(require("../../login/middlewares/LoginInput"));
const UserInput_1 = __importDefault(require("../../users/middlewares/UserInput"));
class UsersRoutes {
    init() {
        const routes = express_1.Router();
        const controller = new UsersController_1.default();
        const lcontroller = new UsersLoginController_1.default();
        //DEBUG
        routes.get("/todos", controller.all);
        routes.post("/login", [LoginInput_1.default], lcontroller.login);
        // routes.post("/login", [NetworkCheck, LoginInput], lcontroller.login);
        routes.post("/usuarios", [UserInput_1.default], controller.store);
        routes.get("/usuarios/:uid", [UsersIdentify_1.default, UsersLoginMiddleware_1.default], controller.show);
        routes.put("/usuarios/:uid", [UsersIdentify_1.default, UserInput_1.default, UsersLoginMiddleware_1.default], controller.update);
        routes.delete("/usuarios/:uid", [UsersIdentify_1.default, UsersLoginMiddleware_1.default], controller.delete);
        return routes;
    }
}
exports.default = UsersRoutes;
