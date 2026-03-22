// const winston=require("winston");
// const path=require("path");
// const { error, warn, debug } = require("console");
// const { write } = require("fs");

// //define log levels (winston already has these)
// const levels={
//     error:0,
//     warn:1,
//     info:2,
//     http:3,
//     debug:4,
// };

// //define colors for console(optional if u want)
// winston.addColors({
//     error:"red",
//     warn:"yellow",
//     info:"green",
//     http:"magenta",
//     debug:"white",
// });

// // Format for console (human-readable)
// const consoleFormat = winston.format.combine(
//   winston.format.colorize({ all: true }),
//   winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//   winston.format.printf(({ timestamp, level, message, ...meta }) => {
//     let metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
//     return `${timestamp} [${level}]: ${message} ${metaStr}`;
//   })
// );

// //format for files (JSON-machine-readable)
// const fileFormat=winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
// );

// //create the logger
// const logger=winston.createLogger({
//     levels,
//     level:process.env.LOG_LEVEL || 'info', //can be set via environment varaiable
//     transports:[
//         //console transport (always on)
//         new winston.transports.Console({
//             format:consoleFormat,

//         }),
//         //File transport for erros(only erros and above)
//         new winston.transports.File({
//             filename:path.join(__dirname, '../logs/error.log'),
//             level:'error',
//             format:fileFormat,
//             maxsize:5242800, //5MB
//             maxFiles:5,
//         }),
//         //file transport for all logs
//         new winston.transports.File({
//             filename:path.join(__dirname,'../logs/combined.log'),
//             format:fileFormat,
//             maxsize:5242880,
//             maxFiles:5,
//         }),
//     ],
// });

// //Create a stream object for morgan (optional -for http request logging)
// logger.stream={
//     write:(message)=>logger.http(message.trim()),
// };

// module.exports=logger;


const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Write all logs to combined.log
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
    }),
    // Write only errors to error.log
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
    }),
  ],
});

// Add console logging in development (or always)
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

// For Morgan HTTP request logging
logger.stream = {
  write: (message) => logger.info(message.trim()),
};

module.exports = logger;