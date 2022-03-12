const router = require('express').Router();
const siteController = require("../../app/controller/siteController");

router.post("/", siteController.login);

module.exports = router;