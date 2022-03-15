const router = require("express").Router();
const userController = require("../../app/controller/userController");

router.get("/:flag", userController.pageDetail);
router.get("/", userController.index);

module.exports = router;