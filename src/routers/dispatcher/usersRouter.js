const router = require("express").Router();
const usersController = require("../../app/controller/usersController");

// router.get("/pagination", usersController.pagination);
router.get("/home", usersController.pageUser);
router.get("/:flag", usersController.pageDetail);
router.get("/", usersController.index);

router.post("/:flag", usersController.createUser);
router.put("/:flag", usersController.updateUser);
router.delete("/", usersController.deleteUser);

module.exports = router;