import {MigrationInterface, QueryRunner} from "typeorm";
export class CreateUserTable1529300295256 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `User` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `User`");
    }
}
