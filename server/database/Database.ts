import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
import {Config} from "../common/config";
import {User} from "./entity/User";

export class Database extends Connection {
    initialize(): void {
    }
}

var database: Database;

export function GetDB(): Promise<Database> {
    if (database) {
        return new Promise((res: (db: Database) => void, rej: (e: Error) => void) => {
            res(database);
        });
    }
    var dbconfig = Config.db;
    //enumerate all entity to be used
    dbconfig.entities = [ User ];
    return createConnection(Config.db).then((c: Connection) => {
        return database = c as Database;
    });
}
