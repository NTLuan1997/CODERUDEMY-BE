const router = require("express").Router();
const courseController = require("../../app/controller/courseController");

router.get("/home", courseController.pageCourse);

module.exports = router;
