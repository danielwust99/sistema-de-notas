import IORedis from "ioredis";
import "dotenv/config";

export class Redis {
    static #connection: IORedis.Redis;

    public static async getConnection(): Promise<IORedis.Redis> {
        if (!this.#connection) {
            try {
                await Redis.prototype.openConnection();
                console.log("💾-> Conectado ao Redis Cache");
            } catch (error){
                console.log("ERRO AO CONECTAR NO CACHE", error);
            }
        }
        return this.#connection;
    }

    public async openConnection(): Promise<void> {
        if (!Redis.#connection) {
            Redis.#connection = new IORedis(process.env.REDIS_URL);
        }
    }
}
