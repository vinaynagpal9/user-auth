const dotenv = require("dotenv");
dotenv.config();
const { logger } = require("../utils");
const request = require("request-promise-native");
const _notitfication = {};
const ejs = require("ejs");
const BASE_URL = process.env.NOTIFICATION_URL || "http://127.0.0.1:3001/v1";

_notitfication.emailVerification = function(payloadData) {
  const confirmationTemplate = "./views/email/signup.ejs";
  return new Promise((resolve, reject) => {
    ejs.renderFile(confirmationTemplate, payloadData, function(err, html) {
      const options = {
        uri: BASE_URL + "/send-email",
        method: "POST",
        body: {
          email: payloadData.email,
          message: html,
          subject: "Verify your email address"
        },
        headers: {
          "User-Agent": "Request-Promise"
        },
        json: true // Automatically parses the JSON string in the response
      };
      request(options)
        .then(function(response) {
          logger.info(response);
          resolve(response);
        })
        .catch(function(err) {
          logger.err(err);
          reject(err);
        });
    });
  });
};

_notitfication.forgotPassword = function(payloadData) {
  logger.info("payloadData", payloadData);
  const forgotPassordTemplate = "./views/forgotPassword/forgotPassword.ejs";
  return new Promise((resolve, reject) => {
    ejs.renderFile(forgotPassordTemplate, payloadData, function(err, html) {
      const options = {
        uri: BASE_URL + "/send-email",
        method: "POST",
        body: {
          email: payloadData.email,
          message: html,
          subject: "Reset your password"
        },
        headers: {
          "User-Agent": "Request-Promise"
        },
        json: true // Automatically parses the JSON string in the response
      };
      request(options)
        .then(function(response) {
          logger.info(response);
          resolve(response);
        })
        .catch(function(err) {
          logger.err(err);
          reject(err);
        });
    });
  });
};

module.exports = _notitfication;
