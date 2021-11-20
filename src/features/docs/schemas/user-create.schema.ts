export const userCreateSchema = {
    type: "object",
    required: ["nome", "usuario", "senha"],
    properties: {
        nome: {
            type: "string",
            example: "Joao da Silva",
            summary: "Nome do usuario",
        },
        usuario: {
            type: "string",
            example: "joaodasilva",
            summary: "Login do usuario",
        },
        senha: {
            type: "string",
            example: "123mudar",
            summary: "senha do usuario",
        },
    },
};
