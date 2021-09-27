const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const AuthModule = require("./auth-manager/routes");

app.use(AuthModule);

module.exports = app;
