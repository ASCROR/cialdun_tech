const express = require('express');
const searchControllers = require('../controllers/search-controllers');
const router = express.Router();



router.get('/:query', searchControllers.doSearch);

module.exports = router;