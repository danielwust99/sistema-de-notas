export const authSchema = {
    type: "object",
    required: ["usuario", "senha"],
    properties: {
        usuario: {
            type: "string",
            example: "joaodasilva",
            description: "Login de acesso",
        },
        senha: {
            type: "string",
            example: "123mudar",
            description: "Senha de acesso",
        },
    },
};

/*
{
"in": "header",
"name": "Authorization",
"required": true,
"type": "string",
"description": "TOKEN para 'SESSION {token}' where {token}."
}
*/
