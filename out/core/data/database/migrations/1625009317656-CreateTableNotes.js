"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableNotes1625009317656 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableNotes1625009317656 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "notas",
            columns: [
                {
                    name: "uid",
                    type: "uuid",
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: "descricao",
                    type: "varchar",
                    length: "50",
                    isNullable: false,
                },
                {
                    name: "detalhamento",
                    type: "varchar",
                    length: "100",
                    isNullable: false,
                },
                {
                    name: "usuario_uid",
                    type: "uuid",
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
            foreignKeys: [
                new typeorm_1.TableForeignKey({
                    columnNames: ["usuario_uid"],
                    referencedColumnNames: ["uid"],
                    referencedTableName: "usuarios",
                }),
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("notas", true, true, true);
    }
}
exports.CreateTableNotes1625009317656 = CreateTableNotes1625009317656;
