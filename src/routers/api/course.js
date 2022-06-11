const router = require("express").Router();
const middleware = require("../../app/middleware/middleware");
const CourseController = require("../../app/controller/CourseController");
const UnitController = require("../../app/controller/UnitController");

    // LESSON

    // UNIT
        router.get("/unit", middleware.UnitTransactions, UnitController.Functions);
        router.post("/unit", middleware.UnitTransactions, UnitController.Functions);
        router.put("/unit", middleware.UnitTransactions, UnitController.Functions);

    // COURSE
        router.get("/course", middleware.CourseTransaction, CourseController.Functions);
        router.post("/course", middleware.CourseTransaction, CourseController.Functions);
        router.put("/course", middleware.CourseTransaction, CourseController.Functions);
        router.delete("/course", middleware.CourseTransaction, CourseController.Functions);

module.exports = router;
