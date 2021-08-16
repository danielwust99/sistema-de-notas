import { UserIdentifyMiddleware } from "../../users/middlewares/UserIdentify";
import { UsersLoginMiddleware } from "../middlewares/UsersLoginMiddleware";
import { UserInputMiddleware } from "../../users/middlewares/UserInput";
import { LoginInputMiddleware } from "../middlewares/LoginInput";
import UsersRepository from "../repositories/UsersRepositories";
import UsersController from "../controllers/UsersController";
import { EMVC, routerMvcAdapter } from "../../../core";
import { MVCController } from "../../../core/contracts";
import { middlewareAdapter } from "../../../core";
import { Router } from "express";

const controlador = (): MVCController => {
    const repo = new UsersRepository();
    return new UsersController(repo);
};

export default class UsersRoutes {
    public init(routes: Router) {
        routes.post(
            "/login",
            [middlewareAdapter(new LoginInputMiddleware())],
            routerMvcAdapter(controlador(), EMVC.LOGIN)
        );
        routes.post(
            "/usuarios",
            [middlewareAdapter(new UserInputMiddleware())],
            routerMvcAdapter(controlador(), EMVC.STORE)
        );
        routes.get(
            "/usuarios/:uid",
            [
                middlewareAdapter(new UserIdentifyMiddleware()),
                // middlewareAdapter(new UsersLoginMiddleware()),
            ],
            routerMvcAdapter(controlador(), EMVC.SHOW)
        );
        routes.put(
            "/usuarios/:uid",
            [
                middlewareAdapter(new UserIdentifyMiddleware()),
                middlewareAdapter(new UserInputMiddleware()),
                // middlewareAdapter(new UsersLoginMiddleware()),
            ],
            routerMvcAdapter(controlador(), EMVC.UPDATE)
        );
        routes.delete(
            "/usuarios/:uid",
            [
                middlewareAdapter(new UserIdentifyMiddleware()),
                // middlewareAdapter(new UsersLoginMiddleware()),
            ],
            routerMvcAdapter(controlador(), EMVC.DELETE)
        );
    }
}
