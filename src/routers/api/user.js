const router = require('express').Router();
const middleware = require("../../app/middleware/userMiddleware");
const authen = require("../../app/middleware/authentication");
const userController = require("../../app/controller/userController");

// SERVER
router.get("/user-signOut", authen.authentication, userController.signOut);
router.get("/home", userController.pageUser);
router.post("/user-single", middleware.mapperUserQuery, userController.findSingleUser);
router.post("/user-new", authen.authentication, authen.permissions, middleware.mapperUser, userController.newUser);
router.put("/user-edit", authen.authentication, authen.permissions, middleware.mapperUser, userController.editUser);
router.delete("/user-remove", authen.authentication, authen.permissions, middleware.mapperUser, userController.removeUser);

// CLIENT
router.post("/client-register", middleware.clientMapper, userController.register);
router.post("/client-signIn", middleware.clientMapper, middleware.clientAccept, userController.signIn);

module.exports = router;