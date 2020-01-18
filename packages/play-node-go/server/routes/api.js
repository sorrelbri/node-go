const express = require('express');
const router = express.Router();
const apiIndexController = require('../controllers/api/apiIndex');
const apiRoomRouter = require('./api/room');

router.use('/rooms', apiRoomRouter);

router.get('/', apiIndexController.apiIndex);

module.exports = router;
