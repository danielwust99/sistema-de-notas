import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsers1625008752930 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("usuarios", true, true, true);
    }
}
