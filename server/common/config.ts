var cnf = process.env.CONFIG_NAME || "dev";
var config_set = {
    dev: function () {
        return {
            db: {
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
