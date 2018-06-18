import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateUserTable1529286132266 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "User",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                }
            ]
        }), true);

        await queryRunner.createIndex("User", new TableIndex({
            name: "idx_user_name",
            columnNames: ["name"]
        }));
    }
    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("User");
    }
}
