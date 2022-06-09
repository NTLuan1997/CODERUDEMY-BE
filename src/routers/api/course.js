const router = require("express").Router();
// const courseController = require("../../app/controller/courseController");
// const unitController = require("../../app/controller/unitController");
// const lessonController = require("../../app/controller/lessonController");
// const clientController = require("../../app/controller/clientController");
// const middleware = require("../../app/middleware/courseMiddleware");
// const clientMiddleware = require("../../app/middleware/clientMiddleware");
// const authen = require("../../app/middleware/authentication");
const middleware = require("../../app/middleware/middleware");
const CourseController = require("../../app/controller/CourseController");
const UnitController = require("../../app/controller/UnitController");

    // LESSON

    // UNIT
        router.get("/unit", middleware.UnitTransactions, UnitController.Functions);

    // COURSE
        router.get("/course", middleware.CourseTransaction, CourseController.Functions);
        router.post("/course", middleware.CourseTransaction, CourseController.Functions);
        router.put("/course", middleware.CourseTransaction, CourseController.Functions);
        router.delete("/course", middleware.CourseTransaction, CourseController.Functions);

module.exports = router;
