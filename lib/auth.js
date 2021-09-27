const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// load up the user model
var User = require("../auth-manager/models/user");

const getToken = function(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Authorization: Bearer g1jipjgi1ifjioj
    // Handle token presented as a Bearer token in the Authorization header
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    // Handle token presented as URI param
    return req.query.token;
  } else if (req.cookies && req.cookies.token) {
    // Handle token presented as a cookie parameter
    return req.cookies.token;
  }
  // If we return null, we couldn't find a token.
  // In this case, the JWT middleware will return a 401 (unauthorized)
  // to the client for this request
  return null;
};
const _auth = {};

_auth.common = function(req, res, next) {
  const token = getToken(req);
  if (!token) {
    res.status(401).json({ message: "Unauthorised access" });
  } else {
    jwt.verify(token, process.env.SECRET || "Development", (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({ message: "Unauthorised access or token expired" });
      } else {
        const criteria = {
          _id: decoded.id
        };
        User.findOne(criteria, function(err, user) {
          delete user.password;
          user.token = token;
          req.user = user;
          next();
        });
      }
    });
  }
};

_auth.user = function(req, res, next) {
  const token = getToken(req);
  if (!token) {
    res.status(401).json({ message: "Unauthorised access" });
  } else {
    jwt.verify(token, process.env.SECRET || "Development", (err, decoded) => {
      if (err || (decoded && decoded.role) != "USER") {
        res
          .status(401)
          .json({ message: "Unauthorised access or token expired" });
      } else {
        const criteria = {
          _id: decoded.id
        };
        User.findOne(criteria, function(err, user) {
          delete user.password;
          user.token = token;
          req.user = user;
          next();
        });
      }
    });
  }
};

_auth.recruiter = function(req, res, next) {
  const token = getToken(req);
  if (!token) {
    res.status(401).json({ message: "Unauthorised access" });
  } else {
    jwt.verify(token, process.env.SECRET || "Development", (err, decoded) => {
      if (err || (decoded && decoded.role) != "RECRUITER") {
        res
          .status(401)
          .json({ message: "Unauthorised access or token expired" });
      } else {
        const criteria = {
          _id: decoded.id
        };
        User.findOne(criteria, function(err, user) {
          delete user.password;
          user.token = token;
          req.user = user;
          next();
        });
      }
    });
  }
};

module.exports = _auth;
