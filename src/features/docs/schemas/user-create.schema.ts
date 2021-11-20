export const userCreateSchema = {
    type: 'object',
    properties: {
        nome: {
            type: 'string',
            summary: 'Nome do usuario'
        },
        usuario: {
            type: 'string',
            summary: 'Login do usuario'
        },
        senha: {
            type: 'string',
            summary: 'senha do usuario'
        },
    }
}