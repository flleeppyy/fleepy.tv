"use strict";
var Logger = /** @class */ (function () {
    function Logger(config) {
        this.levelColors = {
            INFO: "#0FFFFB",
            WARN: "#FFED44",
            ERROR: "#FF182A"
        };
        this.config = {};
        this.logs = [];
        if (config) {
            if (!config instanceof Object) {
                throw new Error("Config not an object");
            }
            if (!config.useDefaultColoring instanceof Boolean) {
                throw new Error("useDefaultColoring not a boolean");
            }
            this.config = config;
        }
    }
    /**
     * @description Do not use
     */
    Logger.prototype._log = function (obj) {
        this.logs.push({
            date: obj.date,
            msg: obj.msg,
            level: obj.level
        });
        var nonString = false;
        if (obj.msg instanceof Object ||
            obj.msg instanceof Array ||
            obj.msg instanceof Function ||
            obj.msg instanceof Boolean ||
            obj.msg instanceof Number)
            nonString = true;
        // if (obj.msg instanceof Object) {
        //   const object
        // }
        var args = [
            "[".concat(obj.date.toLocaleString().split(", ").join(" "), "] %c").concat(obj.level, "%c:") + (nonString ? "" : " ".concat(obj.msg)),
            "color: ".concat(this.levelColors[obj.level], ";"),
            "color: white;"
        ];
        (nonString) ? args.push(obj.msg) : null;
        if (this.config.useDefaultColoring) {
            console[obj.level.toLowerCase()].apply(this, args);
        }
        else {
            console.log.apply(this, args);
        }
    };
    Logger.prototype.info = function (msg) {
        logger._log({
            date: new Date(),
            level: "INFO",
            msg: msg
        });
    };
    Logger.prototype.warn = function (msg) {
        logger._log({
            date: new Date(),
            level: "WARN",
            msg: msg
        });
    };
    ;
    Logger.prototype.error = function (msg) {
        logger._log({
            date: new Date(),
            level: "ERROR",
            msg: msg
        });
    };
    return Logger;
}());
window.Logger = Logger;
