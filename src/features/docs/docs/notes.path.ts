export const notesPath = {
    get: {
        tags: ["Notas"],
        summary: "Listar",
        parameters: [
            {
                in: "path",
                name: "uid",
                type: "string",
                required: true,
                description: "uid do usuario",
            },
        ],
    },
};

export const notesGet = {
    get: {
        tags: ["Notas"],
        summary: "Buscar",
        parameters: [
            {
                in: "path",
                name: "uid",
                type: "uuid",
                required: true,
                description: "uid do usuario",
            },
        ],
        responses: {
            200: {
                description: "Caso de sucesso",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/note",
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
                description: "Caso de inexistencia",
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
        tags: ["Notas"],
        summary: "Atualizar",
        parameters: [
            {
                in: "path",
                name: "uid",
                type: "uuid",
                required: true,
                description: "uid da nota",
            },
        ],
        requestBody: {
            name: "body",
            required: true,
            description: "Corpo da requisição com os dados necessarios",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/noteCreate",
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
                            $ref: "#/schemas/note",
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
                description: "Caso de inexistencia",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/404",
                        },
                    },
                },
            },
        },
    },

    delete: {
        tags: ["Notas"],
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

export const notesPost = {
    post: {
        tags: ["Notas"],
        summary: "Criar",
        requestBody: {
            name: "body",
            required: true,
            description: "Corpo da requisição com os dados necessarios",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/noteCreate",
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
                            $ref: "#/schemas/note",
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
            401: {
                description:
                    "Either the authorization header is missing/badly formed, the token is not valid, or the token is expired, or session service is down.  See response body for more details.",
            },
            403: {
                description:
                    "A permission check failed, input was invalid, or an integrity constraint would be violated if the operation were completed.  See response body for more details.",
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
            405: {
                description: "Validation exception",
            },
            500: {
                description: "Internal Server Error",
            },
        },
    },
};

export const getAll = {
    get: {
        tags: ["Notas"],
        summary: "Buscar",
        parameters: [
            {
                in: "path",
                name: "uid",
                type: "uuid",
                required: true,
                description: "uid do usuario",
            },
        ],
        responses: {
            200: {
                description: "Caso de sucesso",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/note",
                        },
                    },
                },
            },
        },
    },
};

export const deleteAll = {
    delete: {
        tags: ["Notas"],
        summary: "Limpar",
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
