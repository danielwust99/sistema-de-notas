export const usersPath = {
    get: {
        tags: ['Users'],
        summary: 'Listar',
        parameters: []
    }
}

export const userPath = {
    get: {
        tags: ['Users'],
        summary: 'Buscar',
        parameters: [
            {
                name: 'id',
                in: 'path',
                description: 'ID do usuário',
                required: true,
                type: 'number'
            }
        ],
        responses: {
            200: {
                description: 'Caso de sucesso',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/user'
                        }
                    }
                }
            }
        }
    }
}