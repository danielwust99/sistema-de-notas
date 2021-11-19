import NotesRepository from "../../../../src/features/notes/infra/repositories/NotesRepositories";
import NotesController from "../../../../src/features/notes/controllers/NotesController";
import { HttpRequest, serverError, ok } from "../../../../src/core";
import { CacheRepository } from "../../../../src/core";

jest.mock(
    "../../../../src/features/notes/infra/repositories/NotesRepositories.ts"
);
jest.mock("../../../../src/core/infra/data/repositories/cache.repository.ts");

const requestComBody = (): HttpRequest => ({
    body: {
        detalhamento: "qualquer_nome",
        descricao: "qualquer_descricao",
        usuarioUid: "qualquer_uid",
    },
    params: {},
});

const requestInvalida = (): HttpRequest => ({
    body: {
        detalhamento: "qualquer_nome",
        descricao: "qualquer_descricao",
        usuarioUid: "",
    },
    params: {},
});

const requestSemDados = (): HttpRequest => ({
    body: {},
    params: { uid: "qualquer_uid" },
});

const criarNota = (): any => ({
    descricao: "qualquer_uid",
    detalhamento: "qualquer_nome",
    usuarioUid: "qualquer_uid",
});

// sistema = System under test
const criarController = (): NotesController => {
    return new NotesController(new NotesRepository(), new CacheRepository());
};

describe("Controller das notas", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe("Criação de nota", () => {
        test("Deve chamar NotesController quando passado valores validos", async () => {
            const teste = jest.spyOn(NotesRepository.prototype, "create");
            const sistema = criarController();

            const resultado = await sistema.store(requestComBody());

            expect(teste).toHaveBeenCalled();
            expect(teste).toHaveBeenCalledWith(requestComBody().body);
            expect(resultado.statusCode).toBe(200);
        });

        test("Deve retornar codigo 200 quando passado valores validos", async () => {
            jest.spyOn(NotesRepository.prototype, "create")
            .mockResolvedValue(criarNota());

            const sistema = criarController();
            const resultado = await sistema.store(requestComBody());

            expect(resultado).toEqual(ok(criarNota()));
            expect(resultado.statusCode).toBe(200);
        });

        test("Deve retornar codigo 500 em qualquer excessao", async () => {
            jest.spyOn(NotesRepository.prototype, "create")
            .mockRejectedValue(new Error());

            const sistema = criarController();
            const resultado = await sistema.store(requestComBody());

            expect(resultado).toEqual(serverError());
        });
    });

    describe("Obter nota", () => {
        test("Deve retornar codigo 500 em qualquer excessao", async () => {
            jest.spyOn(CacheRepository.prototype, "get")
            .mockRejectedValue(new Error());

            const sistema = criarController();
            const resultado = await sistema.index(requestSemDados());

            expect(resultado).toEqual(serverError());
        });

        test("Deve retornar codigo {;p} se retorno for nulo", async () => {
            jest.spyOn(CacheRepository.prototype, "get")
            .mockResolvedValue(null);
            jest.spyOn(NotesRepository.prototype, "getAll")
            .mockResolvedValue([]);

            const sistema = criarController();
            const resultado = await sistema.index({
                body: {},
                params: {},
            });

            expect(resultado).toEqual({ body: [], statusCode: 200 });
        });

        test("Deve retornar codigo 200 quando repositorio nao tiver dados", async () => {
            jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);
            jest.spyOn(NotesRepository.prototype, "getAll").mockResolvedValue([criarNota()]);

            const sistema = criarController();
            const resultado = await sistema.index(requestComBody());

            expect(resultado).toEqual(ok([criarNota()]));
        });
    });

    describe("Teste de cache", () => {
        test("Deve chamar CacheRepository criando a nota", async () => {
            jest.spyOn(NotesRepository.prototype, "create").mockResolvedValue(criarNota());

            const setSpy = jest.spyOn(CacheRepository.prototype, "set");
            const delSpy = jest.spyOn(CacheRepository.prototype, "del");

            const sistema = criarController();
            await sistema.store(requestComBody());

            expect(setSpy).toHaveBeenCalledWith(
                "nota:qualquer_uid",
                criarNota()
            );
            expect(delSpy).toHaveBeenCalledWith("notas:qualquer_uid");
        });

        test("Deve chamar CacheRepository quando passado valores corretos", async () => {
            jest.spyOn(NotesRepository.prototype, "getOne")
            .mockResolvedValue(criarNota());

            const getSpy = jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);
            const setSpy = jest.spyOn(CacheRepository.prototype, "set").mockResolvedValue(null);

            const sistema = criarController();
            await sistema.index(requestComBody());

            expect(getSpy).toBeTruthy();
            expect(setSpy).toBeTruthy();
        });
        test("Deve retornar codigo 200 quando cacheado", async () => {
            jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue([criarNota()]);

            const sistema = criarController();
            const result = await sistema.index(requestComBody());

            expect(result).toEqual(ok([criarNota()]));
        });
    });
});


// create 

/*
test("Deve retornar codigo 400 quando passado valores invalidos", async () => {
    jest.spyOn(NotesRepository.prototype, "create")
    // .mockRejectedValue(new InvalidParam("dados invalidos"));
    .mockRejectedValue(badRequest(new InvalidParam("dados invalidos")));

    const sistema = criarController();
    const result = await sistema.store(requestSemDados());

    expect(result).toEqual(badRequest(new InvalidParam("dados invalidos")));
});
*/