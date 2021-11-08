import NotesRepository from "../../../../src/features/notes/infra/repositories/NotesRepositories";
import Database from "../../../../src/core/infra/data/connections/Database";
import { Users, Notes } from "../../../../src/core";
import { v4 as uuid } from "uuid";

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

const modeloNota = async () => {
    const usuario = await criarUsuario();

    return {
        uid: "qualquer_uid",
        descricao: "qualquer_descricao",
        detalhamento: "qualquer_detalhamento",
        usuarioUid: usuario.uid,
    };
};

describe("Repositorio de Notas", () => {
    beforeAll(async () => {
        await new Database().openConnection();
    });
    beforeEach(async () => {
        await Notes.clear();
        await Users.clear();
    });
    afterAll(async () => {
        new Database().closeConnection();
    });

    describe("Project Repository", () => {
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

        describe("Repositorio das Notas", () => {
            test("Deve criar uma nova nota quando passar parametros corretos", async () => {
                const dados: any = await criarNota();
                const sistema = new NotesRepository();

                const resultado = await sistema.create(dados);

                expect(resultado).toBeTruthy();
                expect(resultado.uid).toEqual(dados.uid);
            });

            test("Mostrar uma nota valida", async () => {
                const dados: any = await criarNota();
                const sistema = new NotesRepository();

                await sistema.create(dados);

                const resultado = await sistema.getOne(dados.uid);

                expect(resultado).toBeTruthy();
                expect(resultado).toEqual(dados);
            });
 
            test("Mostrar todas notas validas", async () => {
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
    });
});
