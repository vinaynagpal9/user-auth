"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  // required for login
  email: { type: String, unique: true },
  password: { type: String, required: true },

  // additional info
  mobile: { type: String },
  name: { type: String },
  address: { type: String },
  profileImage: { type: String },
  verified: { type: Boolean },

  // system generated
  role: { type: Number, default: 0 },
  resetToken: { type: String },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
