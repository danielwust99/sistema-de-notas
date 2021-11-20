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
                description: "uid do usuario",
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
                description: "uid do usuario",
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
        "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": "Corpo da requisição com os dados necessarios",
              "required": false,
              "schema": {
                "$ref": "#/schemas/userCreate"
              }
            }
          ],      
        /*
        parameters: [
            {
                in: "path",
                type: "string",
                required: true,
                name: "nome",
                description: "nome do usuario",
            },
            {
                in: "path",
                type: "string",
                required: true,
                name: "usuario",
                description: "usuario para login",
            },
            {
                in: "path",
                name: "senha",
                type: "string",
                required: true,
                description: "senha da conta",
            }
        ],
        */
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
