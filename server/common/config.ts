var cnf = process.env.CONFIG_NAME || "dev";
var config_set = {
    dev: function () {
        return {
            db: {
                type: "mysql",
                host: "dbhost",
                port: 3306,
                username: "root",
                password: "admin",
                database: "db",
                migrationsRun: true,
                migrations: ["/project/tools/deploy/migrations/*.js"],
                synchronize: false,
                logging: true
            }
        }
    },
    stage: function () {
        return {
            db: {
            }
        }
    },
    prod: function () {
        return {
            db: {
            }
        }
    }
};
export var Config = config_set[cnf]();
