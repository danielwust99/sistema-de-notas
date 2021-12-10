import * as c from "./components";
import * as s from "./schemas";
import * as d from "./docs";

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
        "/login": d.loginPath,
        "/usuarios": d.usersPost,
        "/usuarios/{uid}": d.usersGet,
        // NOTAS
        "/notas": d.notesPost,
        "/notas/{uid}": d.notesGet,
        "/notas/{uid}/todas": d.notesPath,
        "/notas/{uid}/{limpar}": d.deleteAll,
    },
    schemas: {
        login: s.loginSchema,
        auth: s.authSchema,
        user: s.userSchema,
        note: s.noteSchema,
        delete: s.deleteSchema,
        deleted: s.deletedSchema,
        userCreate: s.userCreateSchema,
        noteCreate: s.noteCreateSchema,
        // ERRORS
        400: s.invalidDataSchema,
        404: s.notFoundSchema,
        500: s.internalServerErrorSchema,
        generic: s.genericErrorSchema,
        // TEST
        test: s.testSchema,
    },
    components: {
      securitySchemes: c.securityComponent,
      serverError: c.serverErrorComponent,
      badRequest: c.badRequestComponent,
      forbidden: c.forbiddenComponent,
      notFound: c.notFoundComponent,
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
