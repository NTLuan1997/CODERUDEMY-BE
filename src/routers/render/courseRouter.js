const router = require("express").Router();
const courseController = require("../../app/controller/courseController");

router.get("/", courseController.renderCourse);

module.exports = router;
