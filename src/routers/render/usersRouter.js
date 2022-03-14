const router = require("express").Router();
const userController = require("../../app/controller/userController");
const user = require("../../app/middleware/userMiddleware");

router.get("/:flag", userController.pageDetail);
router.get("/", userController.index);

router.post("/:flag", userController.createUser);
// router.put("/:flag", userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;