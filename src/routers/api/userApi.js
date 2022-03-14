const router = require('express').Router();
const siteController = require("../../app/controller/siteController");
const userController = require("../../app/controller/userController");

router.get("/home", userController.pageUser);
router.post("/login", siteController.login);

module.exports = router;