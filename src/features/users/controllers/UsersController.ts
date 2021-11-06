import {
    HttpResponse,
    HttpRequest,
    serverError,
    notFound,
    ok,
} from "../../../core";
import UsersRepository from "../infra/repositories/UsersRepositories";
import { MVCController } from "../../../core";

export default class UsersController implements MVCController {
    readonly #repo: UsersRepository;

    constructor(repo: UsersRepository) {
        this.#repo = repo;
    }

    public async store(req: HttpRequest): Promise<HttpResponse> {
        try {
            await this.#repo.create(req.body);

            return ok(true);
        } catch (err) {
            console.error(err);
            return serverError();
        }
    }

    public async show(req: HttpRequest): Promise<HttpResponse> {
        try {
            const usuario = await this.#repo.getOne(req.params.uid);

            if (!usuario) {
                return notFound();
            }

            return ok(usuario);
        } catch (err) {
            console.error(err);
            return serverError();
        }
    }

    public async update(req: HttpRequest): Promise<HttpResponse> {
        try {
            const usuario = await this.#repo.update(req.params.uid, req.body);

            return ok(usuario);
        } catch (err) {
            console.error(err);
            return serverError();
        }
    }

    public async delete(req: HttpRequest): Promise<HttpResponse> {
        try {
            const usuario = await this.#repo.delete(req.params.uid);

            if (!usuario) {
                return notFound();
            }

            return ok({
                Mensagem: `Usuario: ${req.params.uid} deletado com sucesso`,
            });
        } catch (err) {
            console.error(err);
            return serverError();
        }
    }

    public async login(req: HttpRequest): Promise<HttpResponse | any> {
        try {
            const validacao = await this.#repo.login(req.body);

            if (!validacao) {
                return notFound();
            }

            return ok(validacao);
        } catch (err) {
            console.error(err);
            return serverError();
        }
    }

    async index() {
        return serverError();
    }
}
