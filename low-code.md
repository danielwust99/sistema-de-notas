# _UserController_

public async all(req: HttpRequest): Promise<HttpResponse> {
    try {
        const users = await this.#repositorio.getAll();
        if (!users) {
            return notFound();
        }
        return ok(users);
    } catch (erro) {
        console.log(erro);
        return serverError();
    }


# _Contract_

all(httpRequest: HttpRequest): Promise<HttpResponse>;

# _UserRepositories_

async getAll(): Promise<any> {
    const usuarios = await Users.find();
    
    return usuarios.map((usuario) => ({
        uid: usuario.uid,
        nome: usuario.nome,
        usuario: usuario.usuario,
    }));
}

# _UserRoutes_

routes.get("/todos", routerMvcAdapter(makeController(), EMVC.ALL)

# Testes no Routes

// import NetworkCheck from "../../login/middlewares/NetworkCheck";
// routes.post("/login", [NetworkCheck, LoginInput], lcontroller.login);
