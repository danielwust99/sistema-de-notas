export const loginSchema = {
    type: "object",
    properties: {
        uid: {
            type: "string",
            summary: "uid do usuario",
            example: "943e2003-adb9-4a47-b32d-3773ba874642"
        },
        usuario: {
            type: "string",
            summary: "Login do usuario",
            example: "JoaoDaSilva"
        },
        token: {
            type: "string",
            summary: "Token de sessão",
            example: "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkJydW5vIiwiaWF0IjoxNTE2MjM5MDIyfQ"
        },
    },
};
