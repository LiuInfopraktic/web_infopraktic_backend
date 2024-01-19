const express = require('express');
const router = express.Router();


/**********************
 *    Login
**********************/
const login = require("../../controllers/login_controller/loginController");
router.post('/login', login.login);

/**********************
 *    Graphics
**********************/
const graphic = require("../../controllers/graphic_controller/graphicController");
router.get('/users/graphics', login.verify, graphic.userGraphics)
router.get('/graphics/conf', login.verify, graphic.graphicConfig)

module.exports = router;