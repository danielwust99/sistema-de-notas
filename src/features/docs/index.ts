import { userPath, usersPath } from './docs/users.path';
import { userSchema } from './schemas/user.schema';

export default {
    info: {
        title: 'Sistema de Notas',
        description: 'Documentação da API',
        version: '3.2.1'
    },
    openapi: '3.0.0',
    servers: [
        {
            url: '/'
        }
    ],
    paths: {
        '/user': usersPath,
        '/user/{id}': userPath
    },
    schemas: {
        user: userSchema
    }
}