import { Router } from "express";
import UsersLoginController from "../../login/controller/UsersLoginController";
import UsersLoginMiddleware from "../../login/middlewares/UsersLoginMiddleware";
import UsersIdentify from "../../users/middlewares/UsersIdentify";
import NetworkCheck from "../../login/middlewares/NetworkCheck";
import UsersController from "../controllers/UsersController";
import LoginInput from "../../login/middlewares/LoginInput";
import UserInput from "../../users/middlewares/UserInput";

export default class UsersRoutes {
    public init(): Router {
        const routes = Router();
        const controller = new UsersController();
        const lcontroller = new UsersLoginController();

        //DEBUG
        routes.post("/todos", controller.all);
        
        routes.post("/login", [NetworkCheck, LoginInput], lcontroller.login);
        routes.post("/usuarios", [UserInput], controller.store);
        routes.get(
            "/usuarios/:uid",
            [UsersIdentify, UsersLoginMiddleware],
            controller.show
        );
        routes.put(
            "/usuarios/:uid",
            [UsersIdentify, UserInput, UsersLoginMiddleware],
            controller.update
        );
        routes.delete(
            "/usuarios/:uid",
            [UsersIdentify, UsersLoginMiddleware],
            controller.delete
        );

        return routes;
    }
}
