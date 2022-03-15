const router = require('express').Router();
const middleware = require("../../app/middleware/userMiddleware");
const siteController = require("../../app/controller/siteController");
const userController = require("../../app/controller/userController");

router.get("/home", userController.pageUser);
router.post("/login", middleware.mapperUserLogin, siteController.login);
router.post("/new", middleware.mapperUser, userController.newUser);
router.put("/edit", middleware.mapperUser, userController.editUser);
router.delete("/remove", middleware.mapperUser, userController.removeUser);

module.exports = router;