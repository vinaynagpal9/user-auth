const bunyan = require("bunyan");

const logger = bunyan.createLogger({
  name: "auth-service",
  streams: [
    {
      level: "debug",
      stream: process.stdout
    },
    {
      type: "rotating-file",
      level: "info",
      path: "log/auth-service-debug.log",
      period: "1d", // daily rotation
      count: 10 // keep 10 back copies
    },
    {
      type: "rotating-file",
      level: "error",
      path: "log/auth-service-error.log",
      period: "1d", // daily rotation
      count: 10 // keep 10 back copies
    }
  ]
});
//const logger = console;
module.exports = logger;
