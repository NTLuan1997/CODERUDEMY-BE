const router = require("express").Router();
const usersController = require("../../app/controller/usersController");


router.get("/:flag", usersController.pageDetail);
router.get("/", usersController.index);

module.exports = router;