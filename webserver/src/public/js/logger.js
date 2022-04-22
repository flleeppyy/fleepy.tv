"use strict"

class Logger {
  levelColors = {
    INFO: "#0FFFFB",
    WARN: "#FFED44",
    ERROR: "#FF182A"
  };

  config = {};

  logs = [];

  constructor(config) {
    if (config) {
      if (!config instanceof Object) {
        throw new Error("Config not an object")
      }

      if (!config.useDefaultColoring instanceof Boolean) {
        throw new Error("useDefaultColoring not a boolean")
      }

      this.config = config;
    }
  }

  /**
   * @description Do not use
   */
  _log(obj) {
    this.logs.push({
      date: obj.date,
      msg: obj.msg,
      level: obj.level
    });

    let nonString = false;
    if (
      obj.msg instanceof Object ||
      obj.msg instanceof Array ||
      obj.msg instanceof Function ||
      obj.msg instanceof Boolean ||
      obj.msg instanceof Number
    )
      nonString = true;

    // if (obj.msg instanceof Object) {
    //   const object
    // }

    const args = [
      `[${obj.date.toLocaleString().split(", ").join(" ")}] %c${obj.level}%c:` + (nonString ? "" : ` ${obj.msg}`),
      `color: ${this.levelColors[obj.level]};`,
      "color: white;"
    ];

    (nonString) ? args.push(obj.msg) : null;

    if (this.config.useDefaultColoring) {
      console[obj.level.toLowerCase()].apply(this, args);
    } else {
      console.log.apply(this, args );
    }
  }

  info(msg) {
    logger._log({
      date: new Date(),
      level: "INFO",
      msg,
    });
  }

  warn(msg) {
    logger._log({
      date: new Date(),
      level: "WARN",
      msg
    });
  };

  error(msg) {
    logger._log({
      date: new Date(),
      level: "ERROR",
      msg
    });
  }
}

window.Logger = Logger;