const express = require('express');
const verifyUser = require("../../utils/verifyUser.js");
const router = express.Router();
const usersController = require('./users_controller');
const upload = require("../../middleware/multerConfig");

/* GET auth listing. */
router.route('/').get(verifyUser, usersController.findAll);

router.route('/:id').get(verifyUser, usersController.findById);

router.route('/update/:id').put(verifyUser, usersController.update);

router.route('/delete/:id').delete(verifyUser, usersController.delete);

router.route('/updatePhoto/:user_id').post(upload.single('profile_photo'), verifyUser, usersController.updatePhoto);


module.exports = router;
