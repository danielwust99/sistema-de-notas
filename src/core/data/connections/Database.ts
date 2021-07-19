import { Connection, createConnection } from "typeorm";

export default class Database {
    private static connection: Connection;

    public async getConnection() {
        if (Database.connection === null || Database.connection === undefined) {
            try {
                Database.connection = await createConnection();
            } catch (error) {
                return { erro: error.toString().slice() };
            }
        }
    }

    public async openConnection(): Promise<void> {
        if (Database.connection === null || Database.connection === undefined) {
            try {
                Database.connection = await createConnection();
                console.log("🌐-> Conectado ao Banco de dados");
            } catch (error) {
                console.log("ERRO AO CONECTAR NO BANCO", error);
            }
        }
    }
}
