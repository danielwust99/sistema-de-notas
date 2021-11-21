export const userSchema = {
    type: 'object',
    properties: {
        uid: {
            type: 'string',
            description: 'uid do usuario'
        },
        nome: {
            type: 'string',
            description: 'Nome do usuario'
        },
        usuario: {
            type: 'string',
            description: 'Login do usuario'
        },
    }
}