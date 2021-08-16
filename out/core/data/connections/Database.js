"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class Database {
    async getConnection() {
        if (Database.connection === null || Database.connection === undefined) {
            try {
                Database.connection = await typeorm_1.createConnection();
            }
            catch (error) {
                console.log("ERRO AO CONECTAR NO BANCO", error);
                return { erro: error.toString().slice() };
            }
        }
    }
    async openConnection() {
        if (Database.connection === null || Database.connection === undefined) {
            try {
                Database.connection = await typeorm_1.createConnection();
                console.log("🌐-> Conectado ao Banco de dados");
            }
            catch (error) {
                console.log("ERRO AO CONECTAR NO BANCO", error);
            }
        }
    }
    closeConnection() { }
}
exports.default = Database;
