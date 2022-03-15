const router = require('express').Router();
const siteController = require("../../app/controller/siteController");
const userController = require("../../app/controller/userController");

router.get("/home", userController.pageUser);
router.post("/login", siteController.login);
router.post("/new", userController.newUser);
router.put("/edit", userController.editUser);

module.exports = router;