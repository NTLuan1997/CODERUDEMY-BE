const router = require("express").Router();
const courseController = require("../../app/controller/courseController");
const unitController = require("../../app/controller/unitController");
const lessonController = require("../../app/controller/lessonController");
const middleware = require("../../app/middleware/courseMiddleware");

// COURSE
router.get("/home", courseController.pageCourse);
router.post("/single", middleware.converQuerySingle, courseController.findSingle);
router.post("/new", middleware.converInforNew, courseController.newCourse);
router.put("/edit", middleware.converInforEdit, courseController.editCourse);
router.delete("/remove", middleware.converInforRemove, courseController.removeCourse);

// UNIT
router.get("/unit-home", middleware.converPageUnit, unitController.pageUnit);
router.post("/unit-single", middleware.converQueryUnit, unitController.findSingleUnit);
router.post("/unit-new", middleware.converUnit, unitController.newUnit);
router.put("/unit-edit", middleware.converUnit, unitController.editUnit);
router.delete("/unit-remove", middleware.converQueryUnit, unitController.removeUnit);

// LESSON
router.get("/lesson-home", middleware.converPageLesson, lessonController.pageLesson);
router.post("/lesson-single", middleware.converQueryLesson, lessonController.findSingleLessson);
router.post("/lesson-new", middleware.converLesson, lessonController.newLesson);
router.put("/lesson-edit", middleware.converLesson, lessonController.editLesson);
router.delete("/lesson-remove", middleware.converQueryLesson, lessonController.removeLesson);

module.exports = router;
