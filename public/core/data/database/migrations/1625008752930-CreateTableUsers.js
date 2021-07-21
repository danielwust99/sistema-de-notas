"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUsers1625008752930 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableUsers1625008752930 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "usuarios",
            columns: [
                {
                    name: "uid",
                    type: "uuid",
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: "nome",
                    type: "varchar",
                    length: "50",
                    isNullable: false,
                },
                {
                    name: "usuario",
                    type: "varchar",
                    length: "20",
                    isNullable: false,
                },
                {
                    name: "senha",
                    type: "varchar",
                    length: "250",
                    isNullable: false,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    isNullable: false,
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("usuarios", true, true, true);
    }
}
exports.CreateTableUsers1625008752930 = CreateTableUsers1625008752930;
