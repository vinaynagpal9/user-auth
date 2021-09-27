"use strict";

/*
 * Library for storing and editing data
 */

// Dependencies
const Models = require("../models");

// Container for module (to be exported)
const service = {};

// Create and Save a new User
service.createUser = function createUser(objToSave) {
  var newUser = new Models.User(objToSave);
  return newUser.save();
};

service.getOneUser = function getOneUser(criteria) {
  return Models.User.findOne(criteria).exec();
};

//Get Users from DB
service.getUser = function getUser(criteria, projection, options) {
  return Models.User.find(criteria, projection, options).exec();
};

//Update User in DB
service.updateUser = function updateUser(criteria, dataToSet, options) {
  return Models.User.findOneAndUpdate(criteria, dataToSet, options).exec();
};

//Delete User in DB
service.deleteUser = function deleteUser(criteria) {
  return Models.User.findOneAndRemove(criteria).exec();
};

// Export the module
module.exports = service;
