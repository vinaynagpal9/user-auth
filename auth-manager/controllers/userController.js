/*
 *
 * This file will have all the user management related functions
 * 
*/
const Service = require("../services");
const otpService = require("../lib/otpService");
const Notification = require("../../lib/notification");
const utils = require("../../utils");
const TokenManager = require("../lib/tokenManager");
const dotenv = require("dotenv");
const crypto = require("crypto");
const _user = {};

dotenv.config();

function encodeRole(role) {
  return new Promise((resolve, reject) => {
    if (!role) {
      reject(new Error("No role passed !!"));
    } else {
      switch (role) {
        case "ADMIN":
          role = 1;
          break;
        case "USER":
          role = 0;
          break;
        default:
          role = -1;
      }
      if (role == -1) {
        reject(new Error("Wrong Role Passed"));
      } else {
        resolve(role);
      }
    }
  });
}

function decodeRole(role) {
  return new Promise((resolve, reject) => {
    switch (role) {
      case 1:
        role = "ADMIN";
        break;
      case 0:
        role = "USER";
        break;
      default:
        role = -1;
    }
    if (role == -1) {
      reject(new Error("Wrong Role Passed"));
    } else {
      resolve(role);
    }
  });
}

 

_user.signup = function signup(payloadData) {
  return new Promise((resolve, reject) => {
    if (!payloadData.email || !payloadData.password) {
      reject(new Error("Please pass username and password."));
    } else {
      // Hash Password
      var data = {};
      encodeRole(payloadData.role)
        .then(role => {
          // tranform data
          payloadData.role = role;
          payloadData.password = utils.helpers.hash(payloadData.password);
          return Service.UserService.createUser(payloadData);
        })
        .then(user => {
          if (!user) {
            reject(new Error("User not created !!"));
          } else {
            // remove sensitive info
            if (user.password) delete user.password;
            return decodeRole(user.role).then(role => {
              // Assign jwt token
              data["id"] = user._id.toString();
              data["email"] = user.email;
              data["name"] = user.name;
              data["role"] = role;
              return TokenManager.signToken(data);
            });
          }
        })
        .then(token => {
          data["token"] = token;
          // console.log("token", token)
          Notification.emailVerification(data)
            .then(data => {
              utils.logger.info(data);
            })
            .catch(err => {
              utils.logger.error(err);
            });
          resolve({
            success: true,
            message: "Enjoy your token !!",
            token: token,
            id: data["id"],
            role: data["role"]
          });
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

_user.login = function login(payloadData) {
  return new Promise((resolve, reject) => {
    if (!payloadData.email || !payloadData.password) {
      reject(new Error("Please send email and password."));
    } else {
      // Hash Password
      var data = {};
      payloadData.password = utils.helpers.hash(payloadData.password);
      var criteria = {
        email: payloadData.email,
        password: payloadData.password
      };
      Service.UserService.getOneUser(criteria)
        .then(user => {
          if (!user) {
            reject(new Error("Email or Password not matched !!"));
          }
          if (user.password) delete user.password;
          // Assign jwt token
          return decodeRole(user.role).then(role => {
            // Assign jwt token
            data["id"] = user._id.toString();
            data["email"] = user.email;
            data["role"] = role;
            return TokenManager.signToken(data);
          });
        })
        .then(token => {
          // return the information including token as JSON
          resolve({
            success: true,
            message: "Enjoy your token !!",
            token: token,
            id: data["id"],
            role: data["role"]
          });
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

_user.fbLogin = function fbLogin(payloadData) {
  return new Promise((resolve, reject) => {
    if (!payloadData.fbUserId) {
      reject(new Error("Please pass fbUserId."));
    } else {
      Service.UserService.getOneUser(payloadData)
        .then(user => {
          if (!user) {
            payloadData.password = utils.helpers.hash(
              utils.helpers.createRandomString(10)
            );
            // If user is not existed then create new user and assign jwt token
            return Service.UserService.createUser(payloadData);
          } else {
            return user;
          }
        })
        .then(savedUser => {
          // If user is existed then assign jwt token
          const data = {};
          data["id"] = savedUser._id.toString();
          data["fbUserId"] = savedUser.fbUserId;
          data["role"] = savedUser.role;
          return TokenManager.signToken(data);
        })
        .then(token => {
          // return the information including token as JSON
          resolve({
            success: true,
            message: "Enjoy your token !!",
            token: token
          });
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

_user.verifyUserGet = function verifyUserGet(userData, payloadData) {
  let tokenToReturn = null;
  return new Promise((resolve, reject) => {
    utils.logger.info(userData, payloadData);
    const criteria = {
      phoneNo: payloadData.phoneNo
    };
    Service.UserService.getOneUser(criteria)
      .then(user => {
        // This block will either return a user or create one
        utils.logger.info(user);
        if (!user) {
          const dataToSave = {
            phoneNo: payloadData.phoneNo,
            password: utils.helpers.hash(utils.helpers.createRandomString(25))
          };
          return Service.UserService.createUser(dataToSave);
        } else {
          return user;
        }
      })
      .then(savedUser => {
        const data = {};
        data["id"] = savedUser._id.toString();
        data["phoneNo"] = savedUser.phoneNo;
        data["role"] = savedUser.role;
        data["adminToken"] = "";
        return TokenManager.signOTPToken(data);
      })
      .then(token => {
        tokenToReturn = token;
        return otpService.sendOTP(token, payloadData.phoneNo);
      })
      .then(data => {
        utils.logger.info(data);
        resolve({
          success: true,
          message: "Enjoy your token !!",
          token: tokenToReturn
        });
      })
      .catch(err => {
        utils.logger.info(err);
        // rejecting with the global error of any step
        reject(err);
      });
  });
};

// Get Particular User Profile
_user.getProfile = function getProfile(userData) {
  return new Promise((resolve, reject) => {
    const criteria = {
      _id: userData._id
    };
    const projection = {};
    const option = {};
    Service.UserService.getOneUser(criteria, projection, option)
      .then(profileData => {
        profileData = profileData.toObject();
        delete profileData.password;
        decodeRole(profileData.role).then(role => {
          profileData.role = role;
          resolve(profileData);
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

_user.verifyUserPost = function verifyUserPost(userData, payloadData) {
  return new Promise((resolve, reject) => {
    if (!userData) {
      reject(new Error("User Unauthorised"));
    } else {
      otpService
        .verifyOTP(userData.token, payloadData.phoneNo, payloadData.otp)
        .then(data => {
          utils.logger.info(data);
          const criteria = {
            phoneNo: payloadData.phoneNo
          };
          const dataToSet = {
            $set: {
              role: 1
            }
          };
          const option = {};
          return Service.UserService.updateUser(criteria, dataToSet, option);
        })
        .then(data => {
          utils.logger.info(data);
          resolve({ success: true });
        })
        .catch(err => {
          utils.logger.info(err);
          reject(err);
        });
    }
  });
};

//Forgot Password
_user.forgotPassword = function forgotPassword(queryData) {
  return new Promise((resolve, reject) => {
    if (!queryData || !queryData.email) {
      reject(new Error("Please enter the email address"));
    } else {
      const criteria = {
        email: queryData.email
      };
      const projection = {};
      const option = {};
      Service.UserService.getOneUser(criteria, projection, option)
        .then(data => {
          const buffer = crypto.randomBytes(20);
          data.resetToken = buffer.toString("hex");
          return data.save().then(data => {
            const userData = {
              name: data.name,
              email: data.email,
              resetToken: data.resetToken
            };
            return userData;
          });
        })
        .then(userData => {
          return TokenManager.signToken(userData).then(tokenToSend => {
            const emailData = {
              email: userData.email,
              name: userData.name,
              token: tokenToSend
            };
            return emailData;
          });
        })
        .then(forgotEmailData => {
          Notification.forgotPassword(forgotEmailData)
            .then(data => {
              utils.logger.info(data);
            })
            .catch(err => {
              utils.logger.error(err);
            });
          resolve({ success: true });
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

_user.forgotPasswordVerify = function forgotPasswordVerify(payloadData) {
  return new Promise((resolve, reject) => {
    if (!payloadData || !payloadData.token) {
      reject(new Error("Please enter the email address"));
    } else {
      TokenManager.verifyToken(payloadData.token)
        .then(decodedData => {
          const criteria = {
            email: decodedData.email,
            resetToken: decodedData.resetToken
          };
          const projection = {
            _id: 0,
            email: 1,
            name: 1,
            resetToken: 1
          };
          const option = {
            lean: 1
          };
          return Service.UserService.getOneUser(criteria, projection, option);
        })
        .then(data => {
          const dataToSend = {
            name: data.name || "",
            email: data.email || "",
            token: payloadData.token
          };
          return dataToSend;
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};

// Change Password of the User
_user.changePassword = function changePassword(payloadData) {
  return new Promise((resolve, reject) => {
    TokenManager.verifyToken(payloadData.token)
      .then(decodedData => {
        const criteria = {
          email: decodedData.email,
          resetToken: decodedData.resetToken
        };
        const projection = {
          email: 1,
          name: 1,
          resetToken: 1,
          password: 1
        };
        const option = {};
        return Service.UserService.getOneUser(criteria, projection, option);
      })
      .then(data => {
        if (!data) {
          reject(new Error("User Not Found"));
        } else {
          data.resetToken = "";
          data.password = utils.helpers.hash(payloadData.password);
          return data.save();
        }
      })
      .then(() => {
        resolve({ success: true });
      })
      .catch(error => {
        reject(error);
      });
  });
};

// Get Particular User Profile
_user.getUserLists = function getUserLists() {
	return new Promise((resolve, reject) => {
		const criteria = {
		};
		const projection = {};
		const option = {};
		Service.UserService.getUser(criteria, projection, option)
			.then(profileData => {
				resolve(profileData);
			})
			.catch(err => {
				reject(err);
			});
	});
};
module.exports = _user;
