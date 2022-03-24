const router = require("express").Router();
const courseController = require("../../app/controller/courseController");
const middleware = require("../../app/middleware/courseMiddleware");

// Course API
router.get("/home", courseController.pageCourse);
router.post("/single", middleware.converQuerySingle, courseController.findSingle);
router.post("/new", middleware.converInforNew, courseController.newCourse);
router.put("/edit", middleware.converInforEdit, courseController.editCourse);
router.delete("/remove", middleware.converInforRemove, courseController.removeCourse);

// Unit API
router.get("/unit-home", middleware.converPageUnit, courseController.pageUnit);
router.post("/unit-single", middleware.converQueryUnit, courseController.findSingleUnit);
router.post("/unit-new", middleware.converUnit, courseController.newUnit);
router.put("/unit-edit", middleware.converUnit, courseController.editUnit);
router.delete("/unit-remove", middleware.converQueryUnit, courseController.removeUnit);

module.exports = router;
