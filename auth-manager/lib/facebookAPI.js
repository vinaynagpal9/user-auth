"use strict";

/*
 * Library for verifying and setting data
 */

// Dependencies
var request = require("request");

// Container for module (to be exported)
var _service = {};

_service.verifyFbToken = function verifyFbToken(payloadData) {
  return new Promise((resolve, reject) => {
    if (!payloadData || !payloadData.access_token) {
      reject(new Error("There is no payload in this request"));
    } else {
      request(
        `https://graph.facebook.com/me?access_token=${
          payloadData.access_token
        }`,
        function(error, response, body) {
          if (response && response.statusCode == 400) {
            reject(
              new Error("Error validating access token, Session has expired")
            );
          } else if (response && response.statusCode == 200) {
            resolve(JSON.parse(body));
          } else {
            reject(new Error("Internal server error"));
          }
        }
      );
    }
  });
};

// Export the module
module.exports = _service;
