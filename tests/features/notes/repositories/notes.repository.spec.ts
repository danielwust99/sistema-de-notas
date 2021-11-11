import NotesRepository from "../../../../src/features/notes/infra/repositories/NotesRepositories";
import Database from "../../../../src/core/infra/data/connections/Database";
import { Users, Notes } from "../../../../src/core";

jest.mock(
    "../../../../src/features/users/infra/repositories/UsersRepositories.ts"
);
jest.mock(
    "../../../../src/features/notes/infra/repositories/NotesRepositories.ts"
);

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
        descricao: "qualquer_descricao",
        detalhamento: "qualquer_detalhamento",
        usuarioUid: usuario.uid,
    }).save();
};

describe("REPOSITORIO DE NOTA", () => {
    beforeAll(async () => {
        await new Database().openConnection();
    });
    beforeEach(async () => {
        await Notes.clear();
        await Users.clear();
    });
    afterAll(async () => {
        await new Database().closeConnection();
    });
    describe("CREATE", () => {
        describe("Salvamento de nota", () => {
            test("Deve criar uma nova nota quando passar parametros corretos", async () => {
                const dados: any = await criarNota();
                const sistema = new NotesRepository();

                jest.spyOn(
                    NotesRepository.prototype,
                    "create"
                ).mockResolvedValue(dados);

                const resultado = await sistema.create(dados);

                expect(resultado).toBeTruthy();
                expect(resultado.uid).toEqual(dados.uid);
            });
        });

        describe("UPDATE", () => {
            describe("Atualização de nota", () => {
                test("Deve atualizar uma nova nota quando passar parametros corretos", async () => {
                    const dados1: any = await criarNota();
                    const dados2: any = await criarNota();
                    const sistema = new NotesRepository();

                    jest.spyOn(
                        NotesRepository.prototype,
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

        describe("SHOW", () => {
            test("Mostrar uma nota valida", async () => {
                const dados: any = await criarNota();
                const sistema = new NotesRepository();

                jest.spyOn(
                    NotesRepository.prototype,
                    "getOne"
                ).mockResolvedValue(dados);

                const resultado = await sistema.getOne(dados.uid);

                expect(resultado).toBeTruthy();
                expect(resultado).toEqual(dados);
            });

            test("Mostrar todas notas", async () => {
                const dados: any = await criarNota();
                const sistema = new NotesRepository();

                jest.spyOn(
                    NotesRepository.prototype,
                    "getAll"
                ).mockResolvedValue([dados]);

                const resultado = await sistema.getAll(dados.usuarioUid);

                expect(resultado).toBeTruthy();
            });
        });

        describe("DELETE", () => {
            test("Deletar nota", async () => {
                const dados: any = await criarNota();
                const sistema = new NotesRepository();

                jest.spyOn(
                    NotesRepository.prototype,
                    "delete"
                ).mockResolvedValue(dados.usuarioUid);

                const resultado = await sistema.delete(dados.usuarioUid);

                expect(resultado).toBeTruthy();
            });

            test("Deletar todas notas", async () => {
                const dados: any = await criarNota();
                const sistema = new NotesRepository();

                jest.spyOn(
                    NotesRepository.prototype,
                    "deleteAll"
                ).mockResolvedValue(dados.usuarioUid);

                const resultado = await sistema.deleteAll(dados.usuarioUid);

                expect(resultado).toBeTruthy();
            });
        });
    });
});
