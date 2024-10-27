const express = require('express');
const router = express.Router();
const verifyUser = require("../../utils/verifyUser.js");
const jobsController = require('./jobs_controller');

/* GET auth listing. */
router.route('/').get(verifyUser, jobsController.getAllJobs);

router.route('/get_by_company_id/:company_id').get(verifyUser, jobsController.getJobsByCompanyId);

router.route('/get_by_id/:id').get(verifyUser, jobsController.getJobById);

router.route('/search').get(verifyUser, jobsController.searchJobs);

router.route('/delete/:id').delete(verifyUser, jobsController.delete);

router.route('/update/:id').put(verifyUser, jobsController.update);

router.route('/create').post(verifyUser, jobsController.create);

module.exports = router