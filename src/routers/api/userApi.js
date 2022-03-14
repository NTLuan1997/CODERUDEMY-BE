const router = require('express').Router();
const siteController = require("../../app/controller/siteController");
const userController = require("../../app/controller/userController");

router.get("/user/home", userController.pageUser);
router.post("/user/login", siteController.login);
router.put("/user/update", userController.updateUser);

module.exports = router;