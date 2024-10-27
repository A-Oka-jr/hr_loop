const express = require('express');
const router = express.Router();
const verifyUser = require("../../utils/verifyUser.js");
const jobSeekersController = require('./job_seekers_controller');
const upload = require('../../middleware/multerConfig'); // Adjust path as needed

/* GET auth listing. */
router.route('/').get(verifyUser, jobSeekersController.getAll);
router.route('/create').post(verifyUser, jobSeekersController.create);
router.route('/addExperience/:user_id').post(verifyUser, jobSeekersController.addExperience);
router.route('/addEducation/:user_id').post(verifyUser, jobSeekersController.addEducation);
router.route('/:id').get(verifyUser, jobSeekersController.getById);
router.route('/getByUserId/:user_id').get(verifyUser, jobSeekersController.getByUserId);
router.route('/update/:id').put(upload.single('resume_file'),verifyUser, jobSeekersController.update);
router.route('/updateExperience/:user_id').patch(verifyUser, jobSeekersController.updateExperience);
router.route('/updateEducation/:user_id').patch(verifyUser, jobSeekersController.updateEducation);
router.route('/delete/:id').delete(verifyUser, jobSeekersController.delete);
module.exports = router