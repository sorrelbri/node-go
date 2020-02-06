const express = require('express');
const router = express.Router();
const apiIndexController = require('../controllers/api/apiIndex');
const apiRoomRouter = require('./api/room');
const apiGameRouter = require('./api/game');

router.use('/rooms', apiRoomRouter);
router.use('/games', apiGameRouter);

router.get('/', apiIndexController.apiIndex);

module.exports = router;
