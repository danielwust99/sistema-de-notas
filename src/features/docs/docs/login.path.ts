export const loginPath = {
    post: {
        tags: ["Autenticação"],
        summary: "Login",
        parameters: [
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
            },
        ],
        responses: {
            200: {
                description: "Caso de sucesso",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/login",
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
        },
    },
};
