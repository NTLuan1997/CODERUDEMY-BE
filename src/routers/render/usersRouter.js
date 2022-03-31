const router = require("express").Router();
const userController = require("../../app/controller/userController");
const middleware = require("../../app/middleware/authentication");

router.get("/:flag", middleware.authentication, userController.pageDetail);
router.get("/", middleware.authentication, userController.index);

module.exports = router;