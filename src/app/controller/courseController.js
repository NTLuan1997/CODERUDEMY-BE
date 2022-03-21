const courseService = require("../services/courseService");
const moment = require("moment");

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
    findSingle(req, res) {
        courseService.findOneCourse(req.id)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                throw err;
            })
    }

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

    newCourse(req, res) {
        courseService.newCourse(req.courseBody)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                throw err;
            })
    }

    editCourse(req, res) {
        courseService.updateCourse(req.courseQuery, req.courseBody)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                throw err;
            })
    }


    removeCourse(req, res) {
        courseService.deleteCourse(req.courseQuery)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                throw err;
            })
    }

}

module.exports = new CourseController;