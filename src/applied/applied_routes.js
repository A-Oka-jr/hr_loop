const express = require('express');
const router = express.Router();
const verifyUser = require("../../utils/verifyUser.js");
const AppliedController = require('./applied_controller');
/* GET auth listing. */
router.route('/').get(verifyUser, AppliedController.findAll);

router.route('/create').post(verifyUser, AppliedController.create);

router.route('/update/:id').put(verifyUser, AppliedController.update);

router.route('/delete/:id').delete(verifyUser, AppliedController.delete);

router.route('/:id').get(verifyUser, AppliedController.findById);

router.route('/getByJobId/:job_id').get(verifyUser, AppliedController.getByJobId);

router.route('/getByJobSeekerId/:job_seeker_id').get(verifyUser, AppliedController.getByJobSeekerId);

module.exports = router;