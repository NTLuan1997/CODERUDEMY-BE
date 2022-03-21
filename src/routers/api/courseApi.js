const router = require("express").Router();
const courseController = require("../../app/controller/courseController");
const middleware = require("../../app/middleware/courseMiddleware");

router.get("/home", courseController.pageCourse);
router.post("/single", middleware.converBody, courseController.findSingle);
router.post("/new", courseController.newCourse);
router.put("/edit", middleware.converBody, courseController.editCourse);
router.delete("/remove", courseController.removeCourse);

module.exports = router;
