export const userCreateSchema = {
    type: "object",
    required: ["nome", "usuario", "senha"],
    properties: {
        nome: {
            type: "string",
            summary: "Nome do usuario",
            example: "João da Silva",
        },
        usuario: {
            type: "string",
            summary: "Login do usuario",
            example: "joaosilva",
        },
        senha: {
            type: "string",
            summary: "senha do usuario",
            example: "123mudar",
        },
    },
};
