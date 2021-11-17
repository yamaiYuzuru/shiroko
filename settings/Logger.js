let chalk = require("chalk");
const ERROR = chalk.hex("#F04747");
const INFO = chalk.hex("#FF73FA");
const LOG = chalk.hex("#44DDBF");
const WARN = chalk.hex("#fce303");

let winston = require("winston");
let wdrf = require("winston-daily-rotate-file");

let logger = winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      name: "access-file",
      level: "info",
      filename: "./logs/access",
      json: false,
      datePattern: "DD-MM-yyyy",
      prepend: true,
      maxFiles: 10,
    }),
    new winston.transports.DailyRotateFile({
      name: "error-file",
      level: "error",
      filename: "./logs/error",
      json: false,
      datePattern: "DD-MM-yyyy",
      prepend: true,
      maxFiles: 15,
    }),
    new winston.transports.DailyRotateFile({
      name: "warn-file",
      level: "warn",
      filename: "../logs/warn",
      json: false,
      dailyPattern: "DD-MM-yyyy",
      prepend: true,
      maxFiles: 15,
    }),
  ],
});

let originalConsoleLog = console.log;
console.log = function () {
  let args = [];
  for (let i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  originalConsoleLog.apply(console, args);
  logger.info(args);
};

let originalConsoleError = console.error;
console.error = function () {
  let args = [];
  for (let i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  originalConsoleError.apply(console, args);
  logger.error(args);
};

let originalConsoleWarn = console.warn;
console.warn = function () {
  let args = [];
  for (let i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  originalConsoleWarn.apply(console, args);
  logger.warn(args);
};
