import NotesRepository from "../../../../src/features/notes/repositories/NotesRepositories";
import { Users, Notes } from "../../../../src/core/data/database/entities";
import Database from "../../../../src/core/data/connections/Database";
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
        uid: uuid(),
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

    describe("Criar", () => {
        test("Deve criar uma nova nota quando passar parametros corretos", async () => {
            const dados: any = await modeloNota();
            const nota = new NotesRepository();
            const result = await nota.create(dados);

            expect(result).toBeTruthy();
            expect(result.uid).toBeTruthy();
            expect(result.descricao).toEqual(dados.descricao);
            expect(result.detalhamento).toEqual(dados.detalhamento);
        });
    });
});
