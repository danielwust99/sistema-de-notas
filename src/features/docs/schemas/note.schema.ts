export const noteSchema = {
    type: 'object',
    properties: {
        descricao: {
            type: 'string',
            description: 'Breve titulo para nota',
        },
        detalhamento: {
            type: 'string',
            description: 'Detalhamento, pode ser extenso',
        },
        usuarioUID: {
            type: 'string',
            description: 'uid do usuario que criou a nota',
        },
        createdAt: {
            type: 'string',
            description: 'Data de criação da nota',
        },
        updatedAt: {
            type: 'string',
            description: 'Data de atualização da nota',
        },
    },
};
