const router = require("express").Router();
const usersController = require("../../../app/controller/usersController");

router.get("/:flag", usersController.pageDetail);
router.get("/", usersController.index);

router.post("/:flag", usersController.createUser);
router.put("/:flag", usersController.updateUser);
router.delete("/", usersController.deleteUser);
// [NORMAL]

//[API]
router.get("/API/home", usersController.pageUser);

module.exports = router;