const router = require("express").Router();
const courseController = require("../../app/controller/courseController");
const unitController = require("../../app/controller/unitController");
const lessonController = require("../../app/controller/lessonController");
const middleware = require("../../app/middleware/authentication");

// COURSE
router.get("/detail", middleware.authentication, courseController.renderCourseDetail);

// LESSON
router.get("/units/lessons", middleware.authentication, lessonController.renderLesson);
router.get("/units/lessons/detail", middleware.authentication, lessonController.renderLessonDetail);

//UNIT
router.get("/units/detail", middleware.authentication, unitController.renderUnitDetail);
router.get("/units", middleware.authentication, unitController.renderUnit);

// COURSE
router.get("/", middleware.authentication, courseController.renderCourse);

module.exports = router;
