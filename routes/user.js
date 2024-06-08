const express = require('express');
const userController = require('../controller/user');

const router = express.Router();

// User registration
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

router.get('/getUser',userController.getUserByTelegramId)

module.exports = router;
