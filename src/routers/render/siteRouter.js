const express = require('express');
const router = express.Router();
const siteController = require("../../app/controller/siteController");

router.all("/search", siteController.search);
router.all("/home", siteController.home);
router.all("/", siteController.login);

module.exports = router;

