const request = require("request-promise-native");
const utils = require("../../utils");
const dotenv = require("dotenv");
dotenv.config();

function sendOTP(token, phoneNo) {
  return new Promise((resolve, reject) => {
    const options = {
      uri: process.env.NOTIFY_SERVICE || "http://localhost:3001/verifyPhone",
      method: "GET",
      qs: {
        token: token, // -> uri + '?access_token=xxxxx%20xxxxx'
        phoneNo: phoneNo
      },
      headers: {
        "User-Agent": "Request-Promise"
      },
      json: true // Automatically parses the JSON string in the response
    };
    request(options)
      .then(function(response) {
        utils.logger.info(response);
        resolve(response);
      })
      .catch(function(err) {
        utils.logger.info(err);
        reject(err);
      });
  });
}

function verifyOTP(token, phoneNo, otp) {
  return new Promise((resolve, reject) => {
    const options = {
      uri: process.env.NOTIFY_SERVICE || "http://localhost:3001/verifyPhone",
      method: "POST",
      body: {
        phoneNo: phoneNo,
        otp: otp
      },
      headers: {
        "User-Agent": "Request-Promise",
        Authorization: `Bearer ${token}`
      },
      json: true // Automatically parses the JSON string in the response
    };
    request(options)
      .then(function(response) {
        utils.logger.info(response);
        resolve(response);
      })
      .catch(function(err) {
        utils.logger.info(err);
        reject(err);
      });
  });
}

module.exports = {
  sendOTP,
  verifyOTP
};
