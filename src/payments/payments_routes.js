const express = require('express');
const router = express.Router();
const paymentsController = require('./payments_controller');
const verifyUser = require("../../utils/verifyUser.js");

/* GET auth listing. */
router.route('/').get(verifyUser, paymentsController.findAll);

router.route('/:id').get(verifyUser, paymentsController.findById);

router.route('/update/:id').put(verifyUser, paymentsController.update);

router.route('/delete/:id').delete(verifyUser, paymentsController.delete);

router.route('/create').post(verifyUser, paymentsController.create);

router.route('/getPaymentBySubscriptionId/:id').get(verifyUser, paymentsController.getPaymentBySubscriptionId);

router.route('/getPaymentByCompanyId/:id').get(verifyUser, paymentsController.getPaymentByCompanyId);

module.exports = router