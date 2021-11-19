export const userSchema = {
    type: 'object',
    properties: {
        nome: {
            type: 'string',
            summary: 'Nome do usuário'
        },
        usuario: {
            type: 'string',
            summary: 'E-mail do usuário'
        },
        senha: {
            type: 'string',
            summary: 'Senha do usuário'
        }
    }
}