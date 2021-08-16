import { Users } from "../database/entities/Users";

export class UserRepository {
    async getOne(uid: string): Promise<Users | null> {
        const usuario = await Users.findOne(uid);

        if (!usuario) {
            return null;
        }

        return usuario
    }
}
