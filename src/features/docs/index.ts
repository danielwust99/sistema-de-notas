import * as docs from "./docs";
import * as sc from "./schemas";

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
        login: sc.loginSchema,
        user: sc.userSchema,
        note: sc.noteSchema,
        delete: sc.deleteSchema,
        userCreate: sc.userCreateSchema,
        // ERRORS
        generic: sc.genericErrorSchema,
        400: sc.invalidDataSchema,
        404: sc.notFoundSchema,
    },
};
