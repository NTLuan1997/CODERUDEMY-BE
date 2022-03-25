const courseService = require("../services/courseService");
const unitService = require("../services/unitService");
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

    renderUnit(req, res) {
        res.render("components/courses/unit", { show: true });
    }

    renderUnitDetail(req, res) {
        res.render("components/courses/unitDetail", { show: true });
    }

    // Method support api Course.
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

    // Method support api Unit.

    findSingleUnit(req, res) {
        unitService.findOneUnit(req.unitQuery)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                throw err;
            })
    }

    pageUnit(req, res) {
        unitService.findLimitUnit(req.unitQuery, req.limit, req.start)
            .then((data) => {
                res.status(200).json({
                    "units": data[0],
                    "length": data[1]
                })
            })
            .catch((err) => {
                throw err;
            })
    }

    newUnit(req, res) {
        unitService.newUnit(req.unitBody)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                throw err;
            })
    }

    editUnit(req, res) {
        unitService.updateUnit(req.unitQuery, req.unitBody)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                throw err;
            })
    }

    removeUnit(req, res) {
        unitService.deleteUnit(req.unitQuery)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                throw err;
            })
    }

}

module.exports = new CourseController;