const courseService = require("../services/courseService");

class CourseController {

    constructor() { }

    // Method render template.
    renderCourse(req, res) {
        res.render('components/courses/course', { show: true });
    }

    renderCourseDetail(req, res) {
        res.render('components/courses/courseDetail', { show: true });
    }

    renderCourseDetailUpload(req, res) {
        res.render('components/courses/courseDetail', { show: true });
    }

    // Method support api.
    pageCourse(req, res) {
        courseService.findLimitCourse(req.query.limit, req.query.start)
            .then((data) => {
                res.status(200).json({
                    "courses": data[0],
                    "length": data[1]
                })
            })
            .catch((err) => {
                throw err;
            })
    }

}

module.exports = new CourseController;