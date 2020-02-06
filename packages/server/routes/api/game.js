const express = require('express');
const router = express.Router();
const apiGameController = require('../../controllers/api/apiGame');

router.get('/:id', apiGameController.show);

module.exports = router;
