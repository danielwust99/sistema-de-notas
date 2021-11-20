import * as docs from "./docs";
import { userSchema, noteSchema, loginSchema } from "./schemas";

export default {
    info: {
        title: "Sistema de Notas",
        description: "Documentação da API",
        version: "3.2.1",
    },
    openapi: "3.0.0",
    servers: [
        {
            url: "https://sistema-de-notas-back.herokuapp.com/api",
        },
        {
            url: "http://localhost:8080/api",
        },
    ],
    paths: {
        "/login": docs.loginPath,
        "/usuarios": docs.usersPost,
        "/usuarios/{uid}": docs.usersGet,
        "/notas": docs.notesPost,
        "/notas/{uid}": docs.notesGet,
        "/notas/{uid}/{limpar}": docs.deleteAll,
    },
    schemas: {
        login: loginSchema,
        user: userSchema,
        note: noteSchema,
    },
};
