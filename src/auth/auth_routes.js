const express = require('express');
const router = express.Router();
const authController = require('./auth_controller');

/* GET auth listing. */
router.route('/register').post(authController.register);

router.route('/login').post(authController.login);

router.route('/logout').get(authController.logout);

module.exports = router;
