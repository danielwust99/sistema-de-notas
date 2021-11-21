export const noteCreateSchema = {
    type: "object",
    required: ["description", "detalhamento", "usuarioUID"],
    properties: {
        descricao: {
            type: "string",
            example: "Nota 1",
            description: "descricao da nota",
        },
        detalhamento: {
            type: "string",
            example: "Uma nota normal",
            description: "detalhamento da nota",
        },
        usuarioUID : {
            type: "string",
            example: "943e2003-adb9-4a47-b32d-3773ba874642",
            description: "proprietario da nota",
        },
    },
};
