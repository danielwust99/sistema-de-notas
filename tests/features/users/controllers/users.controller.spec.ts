import { HttpRequest, serverError, notFound, ok } from "../../../../src/core";
import UsersController from "../../../../src/features/users/controllers/UsersController";
import UsersRepository from "../../../../src/features/users/infra/repositories/UsersRepositories";

jest.mock("../../../../src/features/users/controllers/UsersController.ts");
jest.mock(
    "../../../../src/features/users/infra/repositories/UsersRepositories.ts"
);

const criarCRUD = (): UsersController => {
    return new UsersController(new UsersRepository());
};

const salvarUsuario = (): HttpRequest => ({
    body: {
        nome: "qualquer_nome",
        usuario: "qualquer_usuario",
        senha: "qualquer_senha",
        createdAt: new Date(Date.now()).toLocaleDateString(),
        updatedAt: new Date(Date.now()).toLocaleDateString(),
    },
    params: {},
});

const atualizarUsuario = (): HttpRequest => ({
    body: {
        nome: "qualquer_nome",
        usuario: "qualquer_usuario",
        senha: "qualquer_senha",
    },
    params: { uid: "qualquer_uid" },
});

const mostrarUsuario = (): HttpRequest => ({
    body: {},
    params: { uid: "qualquer_uid" },
});

const usuarioModelo = {
    nome: "qualquer_nome",
    usuario: "qualquer_usuario",
    senha: "qualquer_senha",
};

describe("User Controller", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe("Salvamento", () => {
        test("Deve chamar UsersController ao passar valores corretos", async () => {
            const sut = criarCRUD();
            const teste = jest.spyOn(UsersController.prototype, "store");

            await sut.store(salvarUsuario().body);

            expect(teste).toHaveBeenCalledWith(salvarUsuario().body);
        });

        test("Deve retornar codigo 200 quando sao passados dados validos", async () => {
            const sut = criarCRUD();
            const teste = jest
                .spyOn(UsersController.prototype, "store")
                .mockResolvedValue(salvarUsuario().body);

            await sut.store(salvarUsuario().body);

            expect(teste).toHaveBeenCalledWith(salvarUsuario().body);
        });
    });

    describe("Atualização", () => {
        test("Deve atualizar quando sao passados dados validos", async () => {
            const sut = criarCRUD();

            await sut.store(salvarUsuario().body);

            const oldSpy = jest
                .spyOn(UsersController.prototype, "update")
                .mockResolvedValue(salvarUsuario().body);

            await sut.update(atualizarUsuario());

            expect(oldSpy).toHaveBeenCalledWith(atualizarUsuario());
        });
    });
});
