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
                in: "path",
                name: "uid",
                type: "string",
                required: true,
                description: "uid do usuario",
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
                            $ref: "#/schemas/400",
                        },
                    },
                },
            },
            404: {
                description: "Caso de inexistentes",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/404",
                        },
                    },
                },
            },
            500: {
                description: "Erro interno",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/500",
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
                in: "path",
                name: "uid",
                type: "string",
                required: true,
                description: "uid do usuario",
            },
        ],
        requestBody: {
            name: "body",
            required: true,
            description: "Corpo da requisição com os dados necessarios",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/userCreate",
                    },
                },
            },
        },
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
                            $ref: "#/schemas/400",
                        },
                    },
                },
            },
            404: {
                description: "Caso de inexistentes",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/404",
                        },
                    },
                },
            },
            500: {
                description: "Erro interno",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/500",
                        },
                    },
                },
            },
        },
    },
    delete: {
        tags: ["Usuarios"],
        summary: "Deletar",
        parameters: [
            {
                in: "path",
                name: "uid",
                type: "string",
                required: true,
                description: "uid do usuario",
            },
        ],
        responses: {
            200: {
                description: "Caso de sucesso com informação",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/deleted",
                        },
                    },
                },
            },
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
        requestBody: {
            name: "body",
            required: true,
            description: "Corpo da requisição com os dados necessarios",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/userCreate",
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Caso de sucesso",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/delete",
                        },
                    },
                },
            },
            400: {
                description: "Caso de dados invalidos",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/400",
                        },
                    },
                },
            },
            404: {
                description: "Caso de inexistentes",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/404",
                        },
                    },
                },
            },
            500: {
                description: "Erro interno",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/500",
                        },
                    },
                },
            },
            /*
            Necessario mudar formato de retorno ao criar usuario
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
            */
        },
    },
};
