const express = require('express');
const router = express.Router();
const siteController = require("../../app/controller/siteController");
const user = require("../../app/middleware/userMiddleware");

router.all("/search", user.accept, siteController.search);
router.all("/home", user.accept, siteController.home);
router.get("/", siteController.login);

module.exports = router;

