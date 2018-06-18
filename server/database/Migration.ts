import { GetDB, Database } from './Database';

async function migrate() {
    console.log("connect to database...");
    var db: Database = await GetDB();
    console.log("running migration...");
    await db.runMigrations({
        transaction: true,
    });
}

migrate().then(() => {
    console.log("migration done");
    process.exit(0);
}).catch((e: Error) => {
    console.log("migration failure:", e);
    process.exit(1);
});
