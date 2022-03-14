const router = require("express").Router();
const usersController = require("../../app/controller/usersController");
const user = require("../../app/middleware/userMiddleware");

router.get("/:flag", user.accept, usersController.pageDetail);
router.get("/", user.accept, usersController.index);

router.post("/:flag", user.accept, usersController.createUser);
router.put("/:flag", user.accept, usersController.updateUser);
router.delete("/", user.accept, usersController.deleteUser);
// [NORMAL]

//[API]
router.get("/API/home", usersController.pageUser);

module.exports = router;