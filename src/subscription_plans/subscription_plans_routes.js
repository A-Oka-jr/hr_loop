const express = require('express');
const router = express.Router();
const subscriptionPlansController = require('./subscription_plans_controller');

/* GET auth listing. */
router.route('/').get(subscriptionPlansController.findAll);

router.route('/create').post(subscriptionPlansController.create);

router.route('/update/:id').put(subscriptionPlansController.update);

router.route('/delete/:id').delete(subscriptionPlansController.delete);
module.exports = router;
