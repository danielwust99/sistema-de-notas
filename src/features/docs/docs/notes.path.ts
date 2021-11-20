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
                description: "UID do usuário",
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
    put: {
        tags: ["Notas"],
        summary: "Atualizar",
        parameters: [
            {
                in: "path",
                name: "uid",
                type: "uuid",
                required: true,
                description: "UID do usuário",
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
    
    delete: {
        tags: ["Notas"],
        summary: "Deletar",
        parameters: [],
        responses: {
            204: true,
        },
    },
};

export const notesPost = {
    post: {
        tags: ["Notas"],
        summary: "Criar",
        parameters: [
            {
                in: "path",
                type: "string",
                required: true,
                name: "descricao",
                description: "descricao da nota",
            },
            {
                in: "path",
                type: "string",
                required: true,
                name: "detalhamento",
                description: "detalhamento da nota",
            },
            {
                in: "path",
                type: "string",
                required: true,
                name: "usuarioUID",
                description: "proprietario da nota",
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
                description: "UID do usuário",
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
            204: true,
        },
    },
};