export const notesPath = {
    get: {
        tags: ["Notas"],
        summary: "Listar",
        parameters: [],
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
        tags: ["Notas"],
        summary: "Atualizar",
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
        tags: ["Notas"],
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

export const notesPost = {
    post: {
        tags: ["Notas"],
        summary: "Criar",
        parameters: [
            {
                in: "body",
                name: "body",
                description: "Corpo da requisição com os dados necessarios",
                schema: {
                    $ref: "#/schemas/noteCreate",
                },
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