const router = require("express").Router();
const middleware = require("../../app/middleware/middleware");
const CourseController = require("../../app/controller/CourseController");
// const UnitController = require("../../app/controller/UnitController");
// const LessonController = require("../../app/controller/lessonController");

    // LESSON
        // router.get("/unit/lesson", middleware.LessonTransaction, LessonController.Functions);
        // router.post("/unit/lesson", middleware.LessonTransaction, LessonController.Functions);
        // router.put("/unit/lesson", middleware.LessonTransaction, LessonController.Functions);

    // UNIT
        // router.get("/unit", middleware.UnitTransactions, UnitController.Functions);
        // router.post("/unit", middleware.UnitTransactions, UnitController.Functions);
        // router.put("/unit", middleware.UnitTransactions, UnitController.Functions);

    // COURSE
        router.get("/course", middleware.CourseTransaction, CourseController.Functions);
        router.post("/course", middleware.CourseTransaction, CourseController.Functions);
        router.put("/course", middleware.CourseTransaction, CourseController.Functions);
        router.delete("/course", middleware.CourseTransaction, CourseController.Functions);

module.exports = router;

