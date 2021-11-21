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
            description: "Servidor local",
            url: "http://localhost:8080/api",
        },
        {
            description: "Servidor remoto",
            url: "https://sistema-de-notas-back.herokuapp.com/api",
        },
    ],
    paths: {
        "/login": docs.loginPath,
        "/usuarios": docs.usersPost,
        "/usuarios/{uid}": docs.usersGet,
        // NOTAS
        "/notas": docs.notesPost,
        "/notas/{uid}": docs.notesGet,
        "/notas/{uid}/todas": docs.notesPath,
        "/notas/{uid}/{limpar}": docs.deleteAll,
    },
    schemas: {
        login: sc.loginSchema,
        auth: sc.authSchema,
        user: sc.userSchema,
        note: sc.noteSchema,
        delete: sc.deleteSchema,
        deleted: sc.deletedSchema,
        userCreate: sc.userCreateSchema,
        noteCreate: sc.noteCreateSchema,
        // ERRORS
        400: sc.invalidDataSchema,
        404: sc.notFoundSchema,
        500: sc.internalServerErrorSchema,
        generic: sc.genericErrorSchema,
        // TEST
        test: sc.testSchema,
    },
    variables: {
        username: {
            default: "daniel",
            description: "for use on test login",
        },
        password: {
            default: "daniel",
            description: "for use on test login",
        },
    },
};
