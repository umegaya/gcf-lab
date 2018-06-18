(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./database/Migration.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./common/config.ts":
/*!**************************!*\
  !*** ./common/config.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
                migrations: ["/project/tools/deploy/migrations/*.js"],
                synchronize: false,
                logging: true
            }
        };
    },
    stage: function () {
        return {
            db: {}
        };
    },
    prod: function () {
        return {
            db: {}
        };
    }
};
exports.Config = config_set[cnf]();


/***/ }),

/***/ "./database/Database.ts":
/*!******************************!*\
  !*** ./database/Database.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const config_1 = __webpack_require__(/*! ../common/config */ "./common/config.ts");
const User_1 = __webpack_require__(/*! ./entity/User */ "./database/entity/User.ts");
class Database extends typeorm_1.Connection {
    initialize() {
    }
}
exports.Database = Database;
var database;
function GetDB() {
    if (database) {
        return new Promise((res, rej) => {
            res(database);
        });
    }
    var dbconfig = config_1.Config.db;
    //enumerate all entity to be used
    dbconfig.entities = [User_1.User];
    return typeorm_1.createConnection(config_1.Config.db).then((c) => {
        return database = c;
    });
}
exports.GetDB = GetDB;


/***/ }),

/***/ "./database/Migration.ts":
/*!*******************************!*\
  !*** ./database/Migration.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __webpack_require__(/*! ./Database */ "./database/Database.ts");
const MysqlDriver_1 = __webpack_require__(/*! typeorm/driver/mysql/MysqlDriver */ "typeorm/driver/mysql/MysqlDriver");
const CommandUtils_1 = __webpack_require__(/*! typeorm/commands/CommandUtils */ "typeorm/commands/CommandUtils");
const StringUtils_1 = __webpack_require__(/*! typeorm/util/StringUtils */ "typeorm/util/StringUtils");
//helper
/**
 * Gets contents of the migration file.
 */
function getTemplate(name, timestamp, upSqls, downSqls) {
    return `import {MigrationInterface, QueryRunner} from "typeorm";
export class ${StringUtils_1.camelCase(name, true)}${timestamp} implements MigrationInterface {
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
var subcmd = process.argv[2];
function main(cmd) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('cmd', cmd);
        console.log("connect to database...");
        var db = yield Database_1.GetDB();
        if (cmd == "apply") {
            console.log("running migration...");
            yield db.runMigrations({
                transaction: true,
            });
        }
        else if (cmd == "revert") {
            console.log("reverting migration...");
            yield db.undoLastMigration({
                transaction: true,
            });
        }
        else if (cmd == "generate") {
            var migname = process.argv[3];
            console.log("generating migration...");
            const timestamp = new Date().getTime();
            const filename = timestamp + "-" + migname + ".ts";
            const sqlInMemory = yield db.driver.createSchemaBuilder().log();
            const upSqls = [], downSqls = [];
            // mysql is exceptional here because it uses ` character in to escape names in queries, that's why for mysql
            // we are using simple quoted string instead of template string syntax
            if (db.driver instanceof MysqlDriver_1.MysqlDriver) {
                sqlInMemory.upQueries.forEach(query => {
                    upSqls.push("        await queryRunner.query(\"" + query.replace(new RegExp(`"`, "g"), `\\"`) + "\");");
                });
                sqlInMemory.downQueries.forEach(query => {
                    downSqls.push("        await queryRunner.query(\"" + query.replace(new RegExp(`"`, "g"), `\\"`) + "\");");
                });
            }
            else {
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
                yield CommandUtils_1.CommandUtils.createFile(path, fileContent);
            }
        }
        yield db.close();
    });
}
main(subcmd).then(() => {
    console.log(`${subcmd} migration done`);
    process.exit(0);
}).catch((e) => {
    console.log(`${subcmd} migration failure:`, e);
    process.exit(1);
});


/***/ }),

/***/ "./database/entity/User.ts":
/*!*********************************!*\
  !*** ./database/entity/User.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;


/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ }),

/***/ "typeorm/commands/CommandUtils":
/*!************************************************!*\
  !*** external "typeorm/commands/CommandUtils" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typeorm/commands/CommandUtils");

/***/ }),

/***/ "typeorm/driver/mysql/MysqlDriver":
/*!***************************************************!*\
  !*** external "typeorm/driver/mysql/MysqlDriver" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typeorm/driver/mysql/MysqlDriver");

/***/ }),

/***/ "typeorm/util/StringUtils":
/*!*******************************************!*\
  !*** external "typeorm/util/StringUtils" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typeorm/util/StringUtils");

/***/ })

/******/ })));