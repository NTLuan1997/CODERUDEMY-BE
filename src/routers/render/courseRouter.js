const router = require("express").Router();
const courseController = require("../../app/controller/courseController");
const upload = require("../../app/middleware/uploadMiddleware");

router.get("/detail", courseController.renderCourseDetail);
router.post("/detail", upload.single("image"), courseController.renderCourseDetailUpload);
router.get("/units/detail", courseController.renderCourseUnitDetail);
router.get("/units", courseController.renderCourseUnit);
router.get("/", courseController.renderCourse);

module.exports = router;
