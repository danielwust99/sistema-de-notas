import NotesRepository from "../../../../src/features/notes/infra/repositories/NotesRepositories";
import NotesController from "../../../../src/features/notes/controllers/NotesController";
import { HttpRequest, serverError, notFound, ok } from "../../../../src/core";
import { CacheRepository } from "../../../../src/core";
import { Users, Notes } from "../../../../src/core";

jest.mock("../../../../src/features/notes/infra/repositories/NotesRepositories.ts");
jest.mock("../../../../src/core/infra/data/repositories/cache.repository.ts");

const makeRequestStore = (): HttpRequest => ({
    body: {
        detalhamento: "any_name",
        descricao: "any_description",
        usuarioUid: "any_uid",
    },
    params: {},
});

const makeRequestFalse = (): HttpRequest => ({
    body: {
        detalhamento: "any_name",
        descricao: "any_description",
        usuarioUid: "",
    },
    params: {},
});

const makeRequestShow = (): HttpRequest => ({
    body: {},
    params: { uid: "any_uid" },
});

const makeResult = (): any => ({
    descricao: "any_uid",
    detalhamento: "any_name",
    usuarioUid: "any_uid",
});

// SUT = System under test
const makeSut = (): NotesController => {
    return new NotesController(new NotesRepository(), new CacheRepository());
};

describe("Project Controller", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe("Store", () => {
        test("should return code 500 when throw any exception", async () => {
            jest.spyOn(NotesRepository.prototype, "create").mockRejectedValue(
                new Error()
            );

            const sut = makeSut();
            const result = await sut.store(makeRequestStore());

            expect(result).toEqual(serverError());
        });

        test("should call NotesRepository when pass correct values", async () => {
            const createSpy = jest.spyOn(NotesRepository.prototype, "create");
            const sut = makeSut();

            await sut.store(makeRequestStore());

            expect(createSpy).toHaveBeenCalledWith(makeRequestStore().body);
        });

        test("should return code 200 when valid data is provided", async () => {
            jest.spyOn(NotesRepository.prototype, "create").mockResolvedValue(
                makeResult()
            );

            const sut = makeSut();
            const result = await sut.store(makeRequestStore());

            expect(result).toEqual(ok(makeResult()));
        });

        test("should call CacheRepository when pass correct values", async () => {
            jest.spyOn(NotesRepository.prototype, "create").mockResolvedValue(
                makeResult()
            );

            const setSpy = jest.spyOn(CacheRepository.prototype, "set");
            const delSpy = jest.spyOn(CacheRepository.prototype, "del");

            // SUT = System under test = o que está sendo testado
            const sut = makeSut();
            await sut.store(makeRequestStore());

            expect(setSpy).toHaveBeenCalledWith("nota:any_uid", makeResult());

            expect(delSpy).toHaveBeenCalledWith("notas:any_uid");
        });
    });

    describe("Index", () => {
        test("should return code 500 when throw any exception", async () => {
            jest.spyOn(CacheRepository.prototype, "get").mockRejectedValue(
                new Error()
            );

            const sut = makeSut();
            const result = await sut.index(makeRequestShow());

            expect(result).toEqual(serverError());
        });

        test("should call CacheRepository when pass correct values", async () => {
            jest.spyOn(NotesRepository.prototype, "getAll").mockResolvedValue([
                makeResult(),
            ]);

            const getSpy = jest
                .spyOn(CacheRepository.prototype, "get")
                .mockResolvedValue(null);
            const setSpy = jest
                .spyOn(CacheRepository.prototype, "set")
                .mockResolvedValue(null);

            const sut = makeSut();
            await sut.index(makeRequestStore());

            expect(getSpy).toBeTruthy();
            expect(setSpy).toBeTruthy();
        });

        test("should return code 200 when cache has any project", async () => {
            jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue([
                makeResult(),
            ]);

            const sut = makeSut();
            const result = await sut.index(makeRequestStore());

            expect(result).toEqual(ok([makeResult()]));
        });

        test("should return code if data sis nullable", async () => {
            jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(
                null
            );
            jest.spyOn(NotesRepository.prototype, "getAll").mockResolvedValue(
                []
            );

            const sut = makeSut();
            const result = await sut.index({
                body: {},
                params: {},
            });

            console.log(result);

            expect(result).toEqual({ body: [], statusCode: 200 });
        });

        test("should return code 200 when repository has any project", async () => {
            jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(
                null
            );

            jest.spyOn(NotesRepository.prototype, "getAll").mockResolvedValue([
                makeResult(),
            ]);

            const sut = makeSut();
            const result = await sut.index(makeRequestStore());

            expect(result).toEqual(ok([makeResult()]));
        });
    });

    describe("show", () => {
        //tema
    });
});
