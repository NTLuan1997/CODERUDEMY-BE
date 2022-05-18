const express = require('express');
const router = express.Router();
const siteController = require("../../app/controller/siteController");
const middleware = require("../../app/middleware/authentication");

router.get("/home", middleware.authentication, siteController.home);
router.get("/", siteController.login);

module.exports = router;

