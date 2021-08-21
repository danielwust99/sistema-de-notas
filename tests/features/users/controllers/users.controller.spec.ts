import { HttpRequest, serverError, notFound, ok } from "../../../../src/core";
import UsersController from "../../../../src/features/users/controllers/UsersController";
import UsersRepository from "../../../../src/features/users/repositories/UsersRepositories";

jest.mock("../../../../src/features/users/controllers/UsersController.ts");
jest.mock("../../../../src/features/users/repositories/UsersRepositories.ts");

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

const criarCRUD = (): UsersController => {
    return new UsersController(new UsersRepository());
};

const mostrarUsuario = (): HttpRequest => ({
    body: {},
    params: { uid: "qualquer_uid" },
});

const buscarUsuario = (): any => ({
    uid: "qualquer_uid",
    usuario: "qualquer_nome",
});

describe("User Controller", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe("Salvamento", () => {
        test("Deve chamar UsersController ao passar valores corretos", async () => {
            const createSpy = jest.spyOn(UsersController.prototype, "store");
            const sut = criarCRUD();

            await sut.store(salvarUsuario().body);

            expect(createSpy).toHaveBeenCalledWith(salvarUsuario().body);
        });

        test("Deve retornar codigo 200 quando sao passados dados validos", async () => {
            jest.spyOn(UsersController.prototype, "store").mockResolvedValue(
                buscarUsuario()
            );

            const sut = criarCRUD();
            const result = await sut.store(salvarUsuario().body);

            expect(result).toBeTruthy();
            // expect(result).toEqual(ok(buscarUsuario()));
        });
    });
});
