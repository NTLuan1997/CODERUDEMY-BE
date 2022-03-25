const router = require("express").Router();
const courseController = require("../../app/controller/courseController");
const unitController = require("../../app/controller/unitController");
const lessonController = require("../../app/controller/lessonController");
const upload = require("../../app/middleware/uploadMiddleware");

// COURSE
router.get("/detail", courseController.renderCourseDetail);
router.post("/detail", upload.single("image"), courseController.renderCourseDetailUpload);

// LESSON
router.get("/units/lessons", lessonController.renderLesson);
router.get("/units/lessons/detail", lessonController.renderLessonDetail);

//UNIT
router.get("/units/detail", unitController.renderUnitDetail);
router.get("/units", unitController.renderUnit);

// COURSE
router.get("/", courseController.renderCourse);

module.exports = router;
