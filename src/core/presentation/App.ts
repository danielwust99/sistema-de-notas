import express, { Router, Request, Response } from "express";
import cors from "cors";

import UsersRoutes from "../../features/users/infra/routers/UsersRoutes";
import NotesRoutes from "../../features/notes/infra/routers/NotesRoutes";

import setupSwagger from "../../config-swagger";

export default class App {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();
    }

    public get server(): express.Application {
        return this.#express;
    }

    public init() {
        this.config();
        this.middlewares();
        this.routes();
    }

    private config() {
        this.#express.use(express.urlencoded({ extended: false }));
        this.#express.use(express.json());
        this.#express.use(cors());
    }

    private middlewares() {}

    private routes() {
        const routers = Router();

        this.#express.get("/", (_: Request, res: Response) =>
            res.redirect("/api")
        );
        this.#express.use("/api", routers);

        routers.get("/", (_: Request, res: Response) =>
            res.send("API RODANDO")
        );

        setupSwagger(this.#express);

        new UsersRoutes().init(routers);
        new NotesRoutes().init(routers);
    }

    /* instanbul ignore next */ 
    public start(port: any) {
        this.#express.listen(port, () => {
            console.log(`🔥-> API Rodando (${port})..`);
        });
    }
}

