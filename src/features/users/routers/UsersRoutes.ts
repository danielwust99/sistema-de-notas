import { Router } from "express";
import UsersLoginController from "../../login/controller/UsersLoginController";
import UsersController from "../controllers/UsersController";
import UsersIdentify from '../../users/middlewares/UsersIdentify';
import UserInput from '../../users/middlewares/UserInput';
import UsersLoginMiddleware from "../../login/middlewares/UsersLoginMiddleware";

export default class UsersRoutes {
    public init(): Router {
        const routes = Router();
        const controller = new UsersController();
        const lcontroller = new UsersLoginController();

        routes.post("/login", lcontroller.login);
        routes.post("/usuarios", [UserInput, UsersLoginMiddleware], controller.store);
        routes.get("/usuarios/:uid", [UsersIdentify, UsersLoginMiddleware], controller.show);
        routes.put("/usuarios/:uid", [UsersIdentify, UserInput, UsersLoginMiddleware], controller.update);
        routes.delete("/usuarios/:uid", [UsersIdentify,UsersLoginMiddleware], controller.delete);
        
        return routes;
    }
}
// routes.get("/usuarios", [UsersLoginMiddleware], controller.index);
