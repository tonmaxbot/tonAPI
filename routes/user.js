const express = require('express');
const userController = require('../controller/user');
const auth =  require("../middleware/auth")
const router = express.Router();


router.post('/register', userController.registerUser);

router.post('/validateUserWallet', userController.validateUserWallet);

router.post('/login', userController.loginUser);

router.get("/getUser",auth,userController.getUserDetails)

router.get("/getReferralTree",userController.getReferralTree)

router.get("/findSlot",userController.findSlot)

router.delete("/resetTable",userController.resetAndDropUsers)

router.post("/getUserAvaliability",userController.checkUsernameAvailability)


module.exports = router;
