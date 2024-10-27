const express = require('express');
const router = express.Router();
const  verifyUser = require("../../utils/verifyUser.js");
const CompanyUsersController = require('./company_users_controller');


router.route('/add_user/:id').post(verifyUser, CompanyUsersController.addUserToCompany);

router.route('/get_by_user_id/:user_id').get(verifyUser, CompanyUsersController.getUserByUserId);


module.exports = router;
