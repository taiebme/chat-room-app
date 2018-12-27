const express = require('express');

const router = express.Router();

const controller = require('../controllers/auth.controller');



// setting nested routes
router.post('/signIn', controller.signIn.bind(controller));

router.post('/signUp', controller.signUp.bind(controller));



module.exports = router;