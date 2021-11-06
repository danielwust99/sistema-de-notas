import { Notes } from "../database";

export class NoteRepository {
    async getOne(uid: string): Promise<Notes | null> {
        const nota = await Notes.findOne(uid);

        if (!nota) {
            return null;
        }

        return nota
    }
}
