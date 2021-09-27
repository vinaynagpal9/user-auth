"use strict";

/*
 * This file contails all the routes that are related to 
 * auth of the user. 
*/
const express = require("express");
const router = express.Router();
const validate = require("express-validation");
const validation = require("./validation");
const Controllers = require("../controllers");
const auth = require("../../lib/auth");
const { logger } = require("../../utils");

/**
 * @api {post} /login Login [POST]
 * @apiGroup Authentication
 * @apiDescription This api is used by login the user using email and password.
 * @apiParam {String} email Email Id of the user.
 * @apiParam {String} password Password.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": Boolean,
 *        "message": "Enjoy your token !!",
 *        "token": "JWT Token",
 *        "id": "User Id",
 *        "role": "User Role"
 *     }
 *
 * @apiErrorExample Error-Response 403:
 *     HTTP/1.1 403 Unable to login.
 *     {
 *       "message": "Unable to login"
 *     }
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "message": "Something went wrong"
 *     }
 */

router.route("/login").post(validate(validation.login), (req, res) => {
  // send only the data that is required by the controller
  logger.info(req.body);
  Controllers.UserController.login(req.body)
    .then(response => {
      if (!response) {
        res.status(500).json({ message: "Something went wrong" });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(err => {
      logger.error(err);
      res.status(403).json({ message: err.message });
    });
});

/**
 * @api {post} /signup Signup [POST]
 * @apiGroup Authentication
 * @apiDescription This api is used by signup the user using email.
 * @apiParam {String} email Email Id of the user.
 * @apiParam {String} password Password.
 * @apiParam {String} mobile Mobile of the user.
 * @apiParam {String} name Name of the user.
 * @apiParam {String} role Role of the user ["USER", "admin"].
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "success": Boolean,
 *        "message": "Enjoy your token !!",
 *        "token": "JWT Token",
 *        "id": "User Id",
 *        "role": "User Role"
 *     }
 *
 * @apiErrorExample Error-Response 403:
 *     HTTP/1.1 403 Unable to signup.
 *     {
 *       "message": "Unable to signup"
 *     }
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "message": "Something went wrong"
 *     }
 */

router.route("/signup").post(validate(validation.signup), (req, res) => {
  // send only the data that is required by the controller
  logger.info(req.body);
  Controllers.UserController.signup(req.body)
    .then(userData => {
      if (!userData) {
        res.status(500).json({ message: "Something went wrong" });
      } else {
        res.status(201).json(userData);
      }
    })
    .catch(err => {
      logger.error(err);
      res.status(403).json({ message: err.message });
    });
});

router
  .route("/forgot-password")
  .get(validate(validation.forgotPassword), (req, res) => {
    // send only the data that is required by the controller
    logger.info(req.query);
    Controllers.UserController.forgotPassword(req.query)
      .then(userData => {
        if (!userData) {
          res.status(500).json({ message: "Something went wrong" });
        } else {
          res.status(201).json(userData);
        }
      })
      .catch(err => {
        logger.error(err);
        res.status(403).json({ message: err.message });
      });
  })
  .post(validate(validation.forgotPasswordVerify), (req, res) => {
    // send only the data that is required by the controller
    logger.info(req.body);
    Controllers.UserController.forgotPasswordVerify(req.body)
      .then(userData => {
        if (!userData) {
          res.status(500).json({ message: "Something went wrong" });
        } else {
          res.status(201).json(userData);
        }
      })
      .catch(err => {
        logger.error(err);
        res.status(403).json({ message: err.message });
      });
  });

router
  .route("/change-password")
  .post(validate(validation.changePassword), (req, res) => {
    // send only the data that is required by the controller
    logger.info(req.body);
    Controllers.UserController.changePassword(req.body)
      .then(userData => {
        if (!userData) {
          res.status(500).json({ message: "Something went wrong" });
        } else {
          res.status(201).json(userData);
        }
      })
      .catch(err => {
        logger.error(err);
        res.status(403).json({ message: err.message });
      });
  });

router
  .route("/verifyUser")
  .get(validate(validation.verifyUserGet), (req, res) => {
    // send only the data that is required by the controller
    logger.info(req.query);
    Controllers.UserController.verifyUserGet(req.user, req.query)
      .then(success => {
        if (!success) {
          res.status(500).json({ message: "Something went wrong" });
        } else {
          res.status(201).json(success);
        }
      })
      .catch(err => {
        logger.error(err);
        res.status(403).json({ message: err.message });
      });
  })
  .post(validate(validation.verifyUserPost), auth.common, (req, res) => {
    // send only the data that is required by the controller
    logger.info(req.body);
    Controllers.UserController.verifyUserPost(req.user, req.body)
      .then(success => {
        if (!success) {
          res.status(500).json({ message: "Something went wrong" });
        } else {
          res.status(201).json(success);
        }
      })
      .catch(err => {
        logger.error(err);
        res.status(403).json({ message: err.message });
      });
  });

router
	.route("/getUserLists")
	.get( (req, res) => {
		// send only the data that is required by the controller
		logger.info(req.query);
		Controllers.UserController.getUserLists()
			.then(success => {
				if (!success) {
					res.status(500).json({ message: "Something went wrong" });
				} else {
					res.status(201).json(success);
				}
			})
			.catch(err => {
				logger.error(err);
				res.status(403).json({ message: err.message });
			});
	});

module.exports = router;
