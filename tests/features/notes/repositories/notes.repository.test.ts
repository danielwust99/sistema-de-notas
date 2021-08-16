import NotesRepository from "../../../../src/features/notes/repositories/NotesRepositories";
import { Users, Notes } from '../../../../src/core/data/database/entities';
import Database from '../../../../src/core/data/connections/Database'

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
            const dados = await criarNota();
            const nota = new NotesRepository();
            const result = await nota.create(dados);

            expect(result).toBeTruthy();
            expect(result.uid).toBeTruthy();
            expect(result.descricao).toEqual(dados.descricao);
            expect(result.detalhamento).toEqual(dados.detalhamento);
        });
    });

    describe("Pegar todas", () => {
        test("Deve obter todas notas de um usuario", async () => {
            const nota = await criarNota();

            jest.spyOn(NotesRepository.prototype, "getAll").mockResolvedValue(
                [nota]
            );
            
            const preparacao = new NotesRepository();
            const resultado = await preparacao.getAll(nota.usuarioUid);

            expect(resultado.length > 0).toBeTruthy();
        });
    });

    describe("Mostrar uma", () => {
        test("Deve retornar uma quando passado uid valido", async () => {
            const nota = await criarNota();

            jest.spyOn(NotesRepository.prototype, "getOne").mockResolvedValue(
                nota
            );

            const preparacao = new NotesRepository();
            const resultado = await preparacao.getOne(nota.uid);

            expect(resultado).toBeTruthy();     
            expect(resultado.uid).toEqual(nota.uid);
        });
    });
});
