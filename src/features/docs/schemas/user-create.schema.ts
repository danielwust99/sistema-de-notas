export const userCreateSchema = {
    type: "object",
    required: ["nome", "usuario", "senha"],
    properties: {
        nome: {
            type: "string",
            example: "Joao da Silva",
            description: "Nome do usuario",
        },
        usuario: {
            type: "string",
            example: "joaodasilva",
            description: "Login do usuario",
        },
        senha: {
            type: "string",
            example: "123mudar",
            description: "senha do usuario",
        },
    },
};
