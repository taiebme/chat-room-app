const express = require('express');

const bearerToken = require('express-bearer-token');

const router = express.Router();

// import room controller
const controller = require('../controllers/room.controller');




// setting nested routes and bind them to the relevant controller
router.get('/rooms', controller.getRooms.bind(controller));

router.get('/:roomId', controller.getRoom.bind(controller));

router.post('/', controller.addRoom.bind(controller));


module.exports = router;