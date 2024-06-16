const express = require('express');
const userController = require('../controller/user');
const auth =  require("../middleware/auth")
const router = express.Router();


router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get("/getUser",auth,userController.getUserDetails)

router.post("/getUserAvaliability",userController.checkUsernameAvailability)


module.exports = router;
