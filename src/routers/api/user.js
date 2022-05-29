const router = require('express').Router();
const middleware = require("../../app/middleware/middleware");
const controller = require("../../app/controller/user");

router.get("/user", middleware.userTransaction, controller.functions);

module.exports = router;
