const Joi = require("joi");

const login = {
  body: {
    email: Joi.string().required(),
    password: Joi.string().required()
  }
};

const signup = {
  body: {
    email: Joi.string().required(),
    password: Joi.string().required(),
    mobile: Joi.string().optional(),
    name: Joi.string().required(),
    role: Joi.string()
      .required()
      .valid(["USER", "ADMIN"])
  }
};

const fbLogin = {
  body: {
    access_token: Joi.string().required()
  }
};

const verifyUserGet = {
  headers: {
    authorization: Joi.string().required()
  },
  query: {
    phoneNo: Joi.string().required()
  }
};

const verifyUserPost = {
  headers: {
    authorization: Joi.string().required()
  }
};

const getUserProfile = {
  headers: {
    authorization: Joi.string().required()
  }
};

const forgotPassword = {
  query: {
    email: Joi.string().required()
  }
};

const forgotPasswordVerify = {
  body: {
    token: Joi.string().required()
  }
};

const changePassword = {
  body: {
    token: Joi.string().required(),
    password: Joi.string().required()
  }
};

module.exports = {
  login,
  signup,
  forgotPassword,
  forgotPasswordVerify,
  changePassword,
  verifyUserGet,
  verifyUserPost,
  getUserProfile,
  fbLogin
};
