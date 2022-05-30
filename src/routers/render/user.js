const router = require("express").Router();
const controller = require("../../app/controller/course");
const middleware = require("../../app/middleware/middleware");
// const userController = require("../../app/controller/userController");
// const middleware = require("../../app/middleware/authentication");
// router.get("/:flag", middleware.authentication, userController.pageDetail);
// router.get("/", middleware.authentication, userController.index);
// router.get("/user", middleware.userTransaction, controller.functions);

module.exports = router;
