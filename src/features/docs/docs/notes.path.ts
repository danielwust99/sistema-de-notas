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
};

export const notesGetAll = {
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

export const notesPut = {
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
};
