const express = require('express');
const router = express.Router();
const apiRoomController = require('../../controllers/api/apiRoom');

router.get('/', apiRoomController.getAll);
router.get('/:id', apiRoomController.show);

module.exports = router;
