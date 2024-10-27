const express = require('express');
const router = express.Router();
const verifyUser = require("../../utils/verifyUser.js");
const EmailController = require('./emails_controller');
/* GET auth listing. */


router.post('/send-invitation/:id', verifyUser, EmailController.sendInvitation);
router.post('/send-evaluation/:id', verifyUser, EmailController.sendEvaluation);

module.exports = router;