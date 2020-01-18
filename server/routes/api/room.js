const express = require('express');
const router = express.Router();
const apiRoomController = require('../../controllers/api/apiRoom');

router.get('/', apiRoomController.roomIndex);

module.exports = router;
