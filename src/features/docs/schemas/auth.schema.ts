export const authSchema = {
    type: "object", // verificar valor certo
    required: ["usuario", "senha"],
    properties: {
        usuario: {
            type: "string",
            example: "joaodasilva",
            summary: "Login de acesso",
        },
        senha: {
            type: "string",
            example: "123mudar",
            summary: "Senha de acesso",
        },
    },
};
