// Bring Mongoose into the app
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const log = require("./utils/logger");
dotenv.config();

// Build the connection string
const dbURI = process.env.MONGOURI || "mongodb://localhost/koot_development";

// Create the database connection
mongoose.connect(
  dbURI,
  err => {
    if (err) {
      log.info("DB Error: ", err);
      throw err;
    } else {
      log.info("MongoDB Connected");
    }
  }
);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", function() {
  log.info("Mongoose default connection open to " + dbURI);
});

// If the connection throws an error
mongoose.connection.on("error", function(err) {
  log.info("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function() {
  log.info("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    log.info(
      "Mongoose default connection disconnected through app termination"
    );
    throw new Error(
      "Mongoose default connection disconnected through app termination"
    );
  });
});
