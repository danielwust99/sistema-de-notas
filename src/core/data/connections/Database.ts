import { Connection, createConnection } from "typeorm";

export default class Database {
    private static connection: Connection;

    public getConnection() {
        if (Database.connection === null || Database.connection === undefined) {
            return "Desconectado";
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
