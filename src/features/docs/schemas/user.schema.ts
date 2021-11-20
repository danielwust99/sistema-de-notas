export const userSchema = {
    type: 'object',
    properties: {
        uid: {
            type: 'string',
            summary: 'uid do usuario'
        },
        nome: {
            type: 'string',
            summary: 'Nome do usuario'
        },
        usuario: {
            type: 'string',
            summary: 'Login do usuario'
        },
    }
}