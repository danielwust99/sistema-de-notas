import NotesRepository from "../../../../src/features/notes/repositories/NotesRepositories";
import NotesRoutes from "../../../../src/features/notes/routers/NotesRoutes";
import { Users, Notes } from "../../../../src/core/data/database/entities";
import Database from "../../../../src/core/data/connections/Database";
import App from "../../../../src/core/presentation/App";
import express, { Router } from "express";
import request from "supertest";

jest.mock("ioredis");

const criarUsuario = async (): Promise<Users> => {
    return Users.create({
        nome: "qualquer_nome",
        usuario: "qualquer_usuario",
        senha: "qualquer_senha",
    }).save();
};

const criarNota = async (): Promise<Notes> => {
    const usuario = await criarUsuario();

    return Notes.create({
        detalhamento: "qualquer_detalhamento",
        descricao: "qualquer_descricao",
        usuarioUid: usuario.uid,
    }).save();
};

describe("Note Routes", () => {
    const server = new App().server;

    beforeEach(async () => {
        await Notes.clear();
        await Users.clear();

        jest.resetAllMocks();
    });

    beforeAll(async () => {
        await new Database().openConnection();

        const router = Router();
        server.use(express.json());

        server.use(router);

        new NotesRoutes().init(router);
    });

    afterAll(async () => {
        new Database().closeConnection();
    });

    describe("Post Notes", () => {
        test("Deve retornar codigo 400 quando nao tiver detalhamento", async () => {
            const user = await criarUsuario();

            await request(server)
                .post("/notas")
                .send({
                    descricao: "qualquer_descricao",
                    startAt: new Date(Date.now()).toLocaleDateString(),
                    finishAt: new Date(Date.now()).toLocaleDateString(),
                    usuarioUid: user.uid,
                })
                .expect(400, { error: "Erro: dados invalidos" });
        });

        test("Deve retornar codigo 200 quando salvar nota", async () => {
            const user = await criarUsuario();

            await request(server)
                .post("/notas")
                .send({
                    detalhamento: "qualquer_nome",
                    descricao: "qualquer_descricao",
                    startAt: new Date(Date.now()).toLocaleDateString(),
                    finishAt: new Date(Date.now()).toLocaleDateString(),
                    usuarioUid: user.uid,
                })
                .expect(200)
                // .expect((request) => {
                //     expect(request.body.usuarioUid).toEqual(user.uid);
                // });
        });
        
        test("Deve retornar codigo 404 quando usuario nao existir", async () => {
            await criarNota();
            
            await request(server)
                .post("/notas")
                .send({
                    descricao: "qualquer_descricao",
                    detalhamento: "qualquer_detalhamento",
                    startAt: new Date(Date.now()).toLocaleDateString(),
                    finishAt: new Date(Date.now()).toLocaleDateString(),
                    usuarioUid: "Vini-eh-o-usuario-bugado"
                }).expect(404);
        });
    });

    describe("/Notas", () => {
        test("Deve retornar codigo 200 com as notas", async () => {
            const nota = await criarNota();

            jest.spyOn(NotesRepository.prototype, "getAll")
            .mockResolvedValue([nota]);

            await request(server).get(`/notas/${nota.usuarioUid}/todas`)
            .expect(200);
        });
    });

    describe("/Nota:uid", () => {
        test("Deve retornar codigo 200 com qualquer nota", async () => {
            const nota = await criarNota();

            jest.spyOn(NotesRepository.prototype, "getOne")
            .mockResolvedValue(nota);

            await request(server)
                .get(`/notas/${nota.uid}`)
                .send()
                .expect(200)
                .expect((request) => {
                    expect(request.body.uid).toEqual(nota.uid);
                });
        });
    });
});
