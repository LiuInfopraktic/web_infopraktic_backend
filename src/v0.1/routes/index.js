const express = require('express');
const router = express.Router();


/**********************
 *    Login
**********************/
const login = require("../../controllers/login_controller/loginController");
router.post('/login', login.login);

module.exports = router;