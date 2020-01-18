const express = require('express');
const router = express.Router();
const apiIndexController = require('../controllers/api/apiIndex');

router.get('/', apiIndexController.apiIndex);

module.exports = router;
