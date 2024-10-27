const express = require('express');
const router = express.Router();
const verifyUser = require("../../utils/verifyUser.js");
const CompanyController = require('./company_controller');
const upload = require("../../middleware/multerConfig");


router.route('/get_by_id/:id').get(verifyUser, CompanyController.getCompanyById);

router.route('/create').post( CompanyController.createCompany);

router.route('/update/:id').put(verifyUser, CompanyController.updateCompany);

router.route('/upload_profile_picture/:id').post( verifyUser, upload.single('profile_picture'), CompanyController.uploadProfilePicture);


module.exports = router;
