import { Connection, createConnection } from "typeorm";

export default class Database {
    private static connection: Connection;

    public async getConnection() {
        if (Database.connection === null || Database.connection === undefined) {
            try {
                Database.connection = await createConnection();
            } catch (error: any) {
                console.log("ERRO AO CONECTAR NO BANCO", error);
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

    public async closeConnection(): Promise<void> {
        if (Database.connection === null || Database.connection === undefined) {
            throw new Error("CONEXAO_DATABASE_NAO_ABERTA");
        } else {
            await Database.connection.close();
        }
    }
}
