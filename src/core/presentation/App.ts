import express from "express";
import cors from "cors";
import Database from "../data/connections/Database";
import UsersRoutes from "../../features/users/routers/UsersRoutes";
import NotesRoutes from "../../features/notes/routers/NotesRoutes";

export default class App {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();
    }

    public async init() {
        this.config();
        this.middlewares();
        this.routes();
        await this.database();
    }

    public async database() {
        await new Database().openConnection();
    }

    public config() {
        this.#express.use(express.json());
        this.#express.use(express.urlencoded({ extended: false }));
    }

    public middlewares() {
        this.#express.use(
            cors({
                origin: "*",
            })
        );
        this.#express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            res.header("Access-Control-Allow-Methods", "*");
            next();
        });
    }

    public routes() {
        const usersRoutes = new UsersRoutes().init();
        const notesRoutes = new NotesRoutes().init();

        this.#express.use(usersRoutes);
        this.#express.use(notesRoutes);
    }

    public start(port: any) {
        this.#express.listen(port, () => {
            console.log(`🔥-> API Rodando (${port})..`);
        });
    }
}
