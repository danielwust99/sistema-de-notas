import UsersRoutes from "../../../../src/features/users/infra/routers/UsersRoutes";
import Database from "../../../../src/core/infra/data/connections/Database";
import App from "../../../../src/core/presentation/App";
import { Users } from "../../../../src/core";
import express, { Router } from "express";
import request from "supertest";

jest.mock("ioredis");

const criarUsuario = async (): Promise<Users> => {
    const usuario = Users.create({
        nome: "qualquer_nome",
        usuario: "qualquer_usuario",
        senha: "qualquer_senha",
    }).save();

    return await usuario;
};

describe("Rotas dos Usuarios", () => {
    const server = new App().server;

    beforeEach(async () => {
        await Users.clear();

        jest.resetAllMocks();
    });

    beforeAll(async () => {
        await new Database().openConnection();

        const router = Router();
        server.use(express.json());

        server.use(router);

        new UsersRoutes().init(router);
    });

    afterAll(async () => {
        await new Database().closeConnection();
    });

    describe("GET - usuarios", () => {
        test("Deve retornar codigo 200 com o usuario", async () => {
            const usuario = await criarUsuario();

            await request(server)
                .get(`/usuarios/${usuario.uid}`)
                .send()
                .expect(200)
                .expect((request) => {
                    expect(request.body.uid).toEqual(usuario.uid);
                });
        });

        test("Deve retornar codigo 404 se usuario nao existir", async () => {
            await request(server)
                .get(`/usuarios/idquenaoexiste`)
                .send()
                .expect(404);
        });
    });

    describe("POST - usuarios", () => {
        test("Deve retornar codigo 400 ao salvar um usuario com dados invalidos", async () => {
            await request(server)
                .post("/usuarios")
                .send({
                    usuario: "",
                    senha: "",
                    nome: "",
                })
                .expect(400, { error: "Erro: dados invalidos" });
        });
    });

    describe("PUT - usuarios", () => {
        test("Deve retornar novo usuario ao atualizar", async () => {
            const usuario = await criarUsuario();

            await request(server)
                .put(`/usuarios/${usuario.uid}`)
                .send({
                    usuario: "usuario_alterado",
                    senha: "senha_alterada",
                    nome: "nome_alterado",
                })
                .expect(200)
                .expect((request) => {
                    expect(request.body.uid).toEqual(usuario.uid);
                });
        });

        test("Deve retornar erro 400 se os dados estiverem invalidos", async () => {
            const usuario = await criarUsuario();

            await request(server)
                .put(`/usuarios/${usuario.uid}`)
                .send({
                    usuario: "",
                    senha: "",
                    nome: "",
                })
                .expect(400, { error: "Erro: dados invalidos" });
        });
    });

    describe("LOGIN - usuarios", () => {
        test("Deve retornar codigo 200 com o token se usuario for valido", async () => {
            await criarUsuario();
            await request(server)
                .post(`/login`)
                .send({
                    usuario: "qualquer_usuario",
                    senha: "qualquer_senha",
                })
                .expect(200)
        });

        test("Deve retornar codigo 400 se dados estiverem incorretos", async () => {
            await criarUsuario();
            await request(server)
                .post(`/login`)
                .send({
                    usuario: "",
                    senha: "",
                })
                .expect(400, { error: "Erro: dados invalidos" });
        });

        test("Deve retornar codigo 404 se usuario nao existir", async () => {
            await request(server)
                .post(`/login`)
                .send({
                    usuario: "usuario_nao_existe",
                    senha: "qualquer_senha",
                })
                .expect(404);
        });
    });
});

// OBS - Para os testes que seriam repetidos e não há necessidade de refazer
// teste de create não necessario, pois ja este sendo criado usuario em varias rotas
// teste de error 400 tbm nao necessario pois utiliza sempre o mesmo middleware
