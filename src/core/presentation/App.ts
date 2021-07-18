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
        this.#express.use(cors());
    }

    public middlewares() {
        this.#express.use(cors());
        this.#express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "https://sistema-de-notas-front.herokuapp.com");
            res.header("Access-Control-Allow-Methods", "*");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,User-Agent");
            res.header("AllowedOrigins", "origin");
            res.header("Referrer-Policy", "origin");
            res.header("Sec-Fetch-Mode", "*");
            res.header("Sec-Fetch-Site", "*");
            next();
        });
    }

    public routes() {
        const usersRoutes = new UsersRoutes().init();
        const notesRoutes = new NotesRoutes().init();

        this.#express.use(usersRoutes);
        this.#express.use(notesRoutes);
        this.#express.use(cors());
    }

    public start(port: any) {
        this.#express.listen(port, () => {
            console.log(`🔥-> API Rodando (${port})..`);
        });
    }
}
