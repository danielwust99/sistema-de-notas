export const loginPath = {
    post: {
        tags: ["Autenticação"],
        summary: "Login",
        parameters: [
            {
                in: "body",
                name: "body",
                required: true,
                description: "Corpo com dados de usuario e senha",
                schema: {
                    $ref: "#/schemas/auth",
                },
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
                description: "Caso de usuario inexistentes",
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
