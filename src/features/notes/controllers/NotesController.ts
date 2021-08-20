import {
    HttpResponse,
    HttpRequest,
    ok,
    serverError,
    notFound,
} from "../../../core";
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

            await this.#cache.set(`notas:${req.params.uid}`, notas);

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

            await this.#cache.set(`nota:${req.body.usuarioUid}`, novaNota);
            await this.#cache.del(`notas:${req.body.usuarioUid}`);

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
            await this.#cache.del(`notas:${notaAlvo.usuarioUid}`);

            return ok(notaAlvo);
        } catch {
            return serverError();
        }
    }

    public async delete(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = req.params;
            const notaAlvo = await this.#repo.delete(uid);

            if (!notaAlvo) {
                return notFound();
            }

            await this.#cache.del(`nota:${uid}`);
            await this.#cache.del(`notas:${notaAlvo}`);

            return ok({ msg: "success" });
        } catch {
            return serverError();
        }
    }

    public async deleteAll(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = req.params;
            const notasAlvo = await this.#repo.deleteAll(uid);

            if (!notasAlvo) {
                return notFound();
            }

            await this.#cache.del(`notas:${uid}`);

            return ok({ msg: "success" });
        } catch {
            return serverError();
        }
    }

    async login() {
        return serverError();
    }
}
