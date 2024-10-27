const express = require('express');
const router = express.Router();
const verifyUser = require("../../utils/verifyUser.js");
const SearchesController = require('./searches_controller');

/* GET auth listing. */

// Specific routes come first
router.route('/getSearchesByCompanyId/:company_id').get(verifyUser, SearchesController.getSearchByCompanyId);
router.route('/create').post(verifyUser, SearchesController.createSearch);
router.route('/update/:id').put(verifyUser, SearchesController.updateSearch);
router.route('/delete/:id').delete(verifyUser, SearchesController.deleteSearch);
router.route('/').get(verifyUser, SearchesController.getSearches);

// Dynamic routes come last
router.route('/:id').get(verifyUser, SearchesController.getSearchById);

module.exports = router;
