export const loginPath = {
    post: {
        tags: ["Autenticação"],
        summary: "Login",
        requestBody: {
            name: "body",
            required: true,
            description: "Corpo com dados de usuario e senha",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/auth",
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
};
