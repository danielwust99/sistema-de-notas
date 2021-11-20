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
                    href: "/notas/{uid}",
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
            400: {
                description: "Caso de dados invalidos",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/generic",
                        },
                    },
                },
            },
            404: {
                description: "Caso de inexistentes",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/generic",
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
            400: {
                description: "Caso de dados invalidos",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/generic",
                        },
                    },
                },
            },
            404: {
                description: "Caso de inexistentes",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/generic",
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
            204: {
                description: "Caso de sucesso",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/delete",
                        },
                    },
                },
            },
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
            400: {
                description: "Caso de dados invalidos",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/generic",
                        },
                    },
                },
            },
            404: {
                description: "Caso de inexistentes",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/generic",
                        },
                    },
                },
            },
        },
    },
};
