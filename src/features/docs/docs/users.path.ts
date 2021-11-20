export const usersPath = {
    get: {
        tags: ["Usuarios"],
        summary: "Listar",
        parameters: [],
    },
};

export const usersGet = {
    get: {
        tags: ["Usuarios"],
        summary: "Buscar",
        parameters: [
            {
                name: "uid",
                in: "path",
                description: "UID do usuário",
                required: true,
                type: "uuid",
            },
        ],
        responses: {
            200: {
                links: {
                    href: "/notas/{uid}"
                },
                description: "Caso de sucesso",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/user",
                        },
                    },
                },
            },
        },
    },
    put: {
        tags: ["Usuarios"],
        summary: "Atualizar",
        parameters: [
            {
                name: "uid",
                in: "path",
                description: "UID do usuário",
                required: true,
                type: "uuid",
            },
        ],
        responses: {
            200: {
                description: "Caso de sucesso",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/user",
                        },
                    },
                },
            },
        },
    },
    delete: {
        tags: ["Usuarios"],
        summary: "Deletar",
        parameters: [],
        responses: {
            204: true,
        },
    },
};

export const usersPost = {
    post: {
        tags: ["Usuarios"],
        summary: "Criar",
        parameters: [
            {
                name: "uid",
                in: "path",
                description: "UID do usuário",
                required: true,
                type: "uuid",
            },
        ],
        responses: {
            200: {
                description: "Caso de sucesso",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/user",
                        },
                    },
                },
            },
        },
    },
};
