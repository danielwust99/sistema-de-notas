import { HttpResponse, HttpRequest, ok, serverError, notFound } from "../../../core";
import { CacheRepository } from "../../../core/data/repositories";
import NotesRepository from "../repositories/NotesRepositories";
import { MVCController } from "../../../core/contracts";

export default class NotesController implements MVCController {
    readonly #repo: NotesRepository;
    readonly #cache: CacheRepository;

    constructor(repo: NotesRepository, cache: CacheRepository) {
        this.#repo = repo;
        this.#cache = cache;
    }

    public async index(req: HttpRequest): Promise<HttpResponse> {
        try {
            const cache = await this.#cache.get(`notas:${req.params.uid}`);

            if (cache) {
                return ok(cache);
            }

            const notas = await this.#repo.getAll(req.params.uid);

            if (!notas) {
                return notFound();
            }

            return ok(notas);
        } catch {
            return serverError();
        }
    }

    public async show(req: HttpRequest): Promise<HttpResponse> {
        try {
            const cache = await this.#cache.get(`nota:${req.params.uid}`);

            if (cache) {
                return ok(cache);
            }

            const nota = await this.#repo.getOne(req.params.uid);

            if (!nota) {
                return notFound();
            }

            return ok(nota);
        } catch {
            return serverError();
        }
    }

    public async store(req: HttpRequest): Promise<HttpResponse> {
        try {
            const novaNota = await this.#repo.create(req.body);

            await this.#cache.set(`nota:${novaNota.uid}`, novaNota);
            await this.#cache.del("nota:all");

            return ok(novaNota);
        } catch {
            return serverError();
        }
    }

    public async update(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = req.params;
            const notaAlvo = await this.#repo.update(uid, req.body);

            if (!notaAlvo) {
                return notFound();
            }

            await this.#cache.set(`nota:${uid}`, notaAlvo);
            await this.#cache.del(`notas:${uid}`);

            return ok(notaAlvo);
        } catch {
            return serverError();
        }
    }

    public async delete(req: HttpRequest): Promise<HttpResponse> {
        try {
            const notaAlvo = await this.#repo.delete(req.params.uid);

            await this.#cache.del(`nota:${req.params.uid}`);

            if (!notaAlvo) {
                return notFound();
            }

            return ok(notaAlvo);
        } catch {
            return serverError();
        }
    }

    public async deleteAll(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = req.params;
            const notasAlvo = await this.#repo.deleteAll(uid);

            await this.#cache.del(`notas:${uid}`);

            if (!notasAlvo) {
                return notFound();
            }

            return ok(notasAlvo);
        } catch {
            return serverError();
        }
    }

    async login() {
        return serverError();
    }
}
