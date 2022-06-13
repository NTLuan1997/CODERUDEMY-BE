const router = require('express').Router();
const middleware = require("../../app/middleware/middleware");
const UserController = require("../../app/controller/UserController");

router.get("/user", middleware.UserTransaction, UserController.Functions);
router.post("/user", middleware.UserTransaction, UserController.Functions);
router.put("/user", middleware.UserTransaction, UserController.Functions);
router.delete("/user", middleware.UserTransaction, UserController.Functions);

module.exports = router;

