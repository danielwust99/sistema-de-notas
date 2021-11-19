import UsersRepository from "../../../../src/features/users/infra/repositories/UsersRepositories";
import Database from "../../../../src/core/infra/data/connections/Database";
import { Users } from "../../../../src/core";

jest.mock(
    "../../../../src/features/users/infra/repositories/UsersRepositories.ts"
);

const modeloUsuario = {
    nome: "qualquer_nome",
    usuario: "qualquer_usuario",
    senha: "qualquer_senha",
};

const criarUsuario = async (): Promise<Users> => {
    return Users.create(modeloUsuario).save();
};

describe("REPOSITORIO DE USUARIO", () => {
    beforeAll(async () => {
        await new Database().openConnection();
    });
    beforeEach(async () => {
        await Users.clear();
    });
    afterAll(async () => {
        await new Database().closeConnection();
    });
    describe("CREATE", () => {
        describe("Salvamento de usuario", () => {
            test("Deve criar um novo usuario quando passar parametros corretos", async () => {
                const dados = await criarUsuario();

                jest.spyOn(
                    UsersRepository.prototype,
                    "create"
                ).mockResolvedValue(dados);

                const sistema = new UsersRepository();
                const resultado = await sistema.create(dados);

                expect(resultado).toBeTruthy();
                // expect(resultado.usuario).toEqual(dados.usuario);
            });
        });
    });

    describe("SHOW", () => {
        test("Mostrar um usuario valido", async () => {
            const dados: any = await criarUsuario();

            jest.spyOn(UsersRepository.prototype, "getOne").mockResolvedValue(
                dados
            );

            const sistema = new UsersRepository();
            const resultado = await sistema.getOne(dados.uid);

            expect(resultado).toBeTruthy();
            expect(resultado).toEqual(dados);
        });
    });

    describe("UPDATE", () => {
        describe("Atualização de nota", () => {
            test("Deve atualizar uma nova nota quando passar parametros corretos", async () => {
                const dados1: any = await criarUsuario();
                const dados2: any = await criarUsuario();
                const sistema = new UsersRepository();

                jest.spyOn(
                    UsersRepository.prototype,
                    "update"
                ).mockResolvedValue(dados2);

                await sistema.create(dados1);

                dados2.uid = dados1.uid;
                const resultado = await sistema.update(dados1.uid, dados2);

                expect(resultado).toBeTruthy();
                expect(resultado.uid).toEqual(dados1.uid);
            });
        });
    });

    describe("DELETE", () => {
        test("Deletar usuario", async () => {
            const dados: any = await criarUsuario();

            jest.spyOn(UsersRepository.prototype, "delete").mockResolvedValue(
                true
            );

            const sistema = new UsersRepository();
            const resultado = await sistema.delete(dados.usuarioUid);

            expect(resultado).toBeTruthy();
            expect(resultado).toEqual(true);
        });
    });
});
