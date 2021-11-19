import NotesRepository from "../../../../src/features/notes/infra/repositories/NotesRepositories";
import NotesRoutes from "../../../../src/features/notes/infra/routers/NotesRoutes";
import Database from "../../../../src/core/infra/data/connections/Database";
import App from "../../../../src/core/presentation/App";
import { Users, Notes } from "../../../../src/core";
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

describe("Rotas das Notas", () => {
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
        await new Database().closeConnection();
    });

    describe("GET - Notas", () => {
        test("Deve retornar codigo 200 com as notas", async () => {
            const nota = await criarNota();

            jest.spyOn(NotesRepository.prototype, "getAll").mockResolvedValue([
                nota,
            ]);

            await request(server)
                .get(`/notas/${nota.usuarioUid}/todas`)
                .send()
                .expect(200);
        });
    });

    describe("GET - Nota Única", () => {
        test("Deve retornar codigo 200 com qualquer nota", async () => {
            const nota = await criarNota();

            jest.spyOn(NotesRepository.prototype, "getOne").mockResolvedValue(
                nota
            );

            await request(server)
                .get(`/notas/${nota.usuarioUid}`)
                .send(nota)
                .expect(200)
                .expect((request) => {
                    expect(request.body.usuarioUid).toEqual(nota.usuarioUid);
                });
        });
    });

    describe("POST - Notas", () => {
        test("Deve retornar codigo 400 ao salvar uma nota com invalido detalhamento", async () => {
            const usuario = await criarUsuario();

            await request(server)
                .post("/notas")
                .send({
                    detalhamento: "",
                    descricao: "qualquer_descricao",
                    usuarioUid: usuario.uid,
                })
                .expect(400, { error: "Erro: dados invalidos" });
        });

        test("Deve retornar codigo 404 com usuario invalido", async () => {
            await request(server)
                .post("/notas")
                .send({
                    detalhamento: "qualquer_name",
                    descricao: "qualquer_descricao",
                    usuarioUid: 'id_inexistente',
                })
                .expect(404)
        });
    });
});
