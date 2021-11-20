export const noteSchema = {
    type: 'object',
    properties: {
        descricao: {
            type: 'string',
            summary: 'Breve titulo para nota',
        },
        detalhamento: {
            type: 'string',
            summary: 'Detalhamento, pode ser extenso',
        },
        usuarioUID: {
            type: 'string',
            summary: 'uid do usuario que criou a nota',
        },
        createdAt: {
            type: 'string',
            summary: 'Data de criação da nota',
        },
        updatedAt: {
            type: 'string',
            summary: 'Data de atualização da nota',
        },
    },
};
