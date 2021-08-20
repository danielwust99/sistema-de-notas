import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateTableNotes1625009317656 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
                    new TableForeignKey({
                        columnNames: ["usuario_uid"],
                        referencedColumnNames: ["uid"],
                        referencedTableName: "usuarios",
                    }),
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("notas", true, true, true);
    }
}
