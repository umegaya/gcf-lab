import { GetDB, Database } from './Database';
import { MysqlDriver } from 'typeorm/driver/mysql/MysqlDriver';
import { CommandUtils } from "typeorm/commands/CommandUtils";
import {camelCase} from "typeorm/util/StringUtils";

//helper
/**
 * Gets contents of the migration file.
 */
function getTemplate(name: string, timestamp: number, upSqls: string[], downSqls: string[]): string {
    return `import {MigrationInterface, QueryRunner} from "typeorm";
export class ${camelCase(name, true)}${timestamp} implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
${upSqls.join(`
`)}
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
${downSqls.join(`
`)}
    }
}
`;
}

//main
var subcmd: string = process.argv[2];
async function main(cmd: string) {
    console.log('cmd', cmd);
    console.log("connect to database...");
    var db: Database = await GetDB();
    if (cmd == "apply") {
        console.log("running migration...");
        await db.runMigrations({
            transaction: true,
        });
    } else if (cmd == "revert") {
        console.log("reverting migration...");
        await db.undoLastMigration({
            transaction: true,
        });
    } else if (cmd == "generate") {
        var migname: string = process.argv[3];
        console.log("generating migration...");
        const timestamp = new Date().getTime();
        const filename = timestamp + "-" + migname + ".ts";
        const sqlInMemory = await db.driver.createSchemaBuilder().log();
        const upSqls: string[] = [], downSqls: string[] = [];

        // mysql is exceptional here because it uses ` character in to escape names in queries, that's why for mysql
        // we are using simple quoted string instead of template string syntax
        if (db.driver instanceof MysqlDriver) {
            sqlInMemory.upQueries.forEach(query => {
                upSqls.push("        await queryRunner.query(\"" + query.replace(new RegExp(`"`, "g"), `\\"`) + "\");");
            });
            sqlInMemory.downQueries.forEach(query => {
                downSqls.push("        await queryRunner.query(\"" + query.replace(new RegExp(`"`, "g"), `\\"`) + "\");");
            });
        } else {
            sqlInMemory.upQueries.forEach(query => {
                upSqls.push("        await queryRunner.query(`" + query.replace(new RegExp("`", "g"), "\\`") + "`);");
            });
            sqlInMemory.downQueries.forEach(query => {
                downSqls.push("        await queryRunner.query(`" + query.replace(new RegExp("`", "g"), "\\`") + "`);");
            });
        }

        if (upSqls.length) {
            const fileContent = getTemplate(migname, timestamp, upSqls, downSqls.reverse());
            const path = process.cwd() + "/database/migrations/" + filename;
            await CommandUtils.createFile(path, fileContent);
        }
    }
    await db.close();
}

main(subcmd).then(() => {
    console.log(`${subcmd} migration done`);
    process.exit(0);
}).catch((e: Error) => {
    console.log(`${subcmd} migration failure:`, e);
    process.exit(1);
});
