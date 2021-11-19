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
            url: "http://localhost:8080",
        },
        {
            url: "https://sistema-de-notas-back.herokuapp.com",
        },
    ],
    paths: Object.assign(
        {},
        {
            "/login": docs.loginPath,
            "/notas/{uid}/todas": docs.notesGetAll,
        },
        {
            "/usuarios": docs.usersPost,
            "/usuarios/{uid}/get": docs.usersGet,
            "/usuarios/{uid}/put": docs.usersPut,
            "/usuarios/{uid}/del": docs.usersDel,
        },
        {
            "/notas": docs.notesPost,
            "/notas/{uid}/put": docs.notesPut,
            "/notas/{uid}/del": docs.notesGet,
            "/notas/{uid}/{limpar}": docs.notesGet,
        }
    ),
    schemas: {
        login: loginSchema,
        user: userSchema,
        note: noteSchema,
    },
};
