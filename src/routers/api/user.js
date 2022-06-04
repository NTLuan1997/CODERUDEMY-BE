const router = require('express').Router();
const middleware = require("../../app/middleware/middleware");
const controller = require("../../app/controller/user");

router.get("/user", middleware.userTransaction, controller.functions);
router.post("/user", middleware.userTransaction, controller.functions);
router.put("/user", middleware.userTransaction, controller.functions);
router.delete("/user", middleware.userTransaction, controller.functions);

module.exports = router;
