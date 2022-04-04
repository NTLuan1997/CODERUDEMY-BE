const ObjectId = require("mongodb").ObjectId;
const unitService = require("../services/unitService");
const courseService = require("../services/courseService");

class UnitController {

    constructor() { }

    // Method render template.

    renderUnit(req, res) {
        res.render("components/courses/unit", { show: true });
    }

    renderUnitDetail(req, res) {
        res.render("components/courses/unitDetail", { show: true });
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

    unit(req, res) {
        unitService.findLimitUnit(req.unitQuery, req.query.limit, req.query.start)
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
                return data;
            })
            .then((data) => {
                if (data.status) {
                    return unitService.countUnit(req.unitCourseQuery);
                }
            })
            .then((count) => {
                if (count >= 0) {
                    return courseService.updateCourse(req.courseQuery, { "unit": Number(count) });
                }
            })
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
        let query = null;
        let courseQuery = null;

        unitService.findOneUnit(req.unitQuery)
            .then((unit) => {
                query = { "courseId": { "$eq": unit.courseId } };
                courseQuery = { "_id": { "$eq": new ObjectId(unit.courseId) } };
                return unitService.deleteUnit(req.unitQuery);
            })
            .then((del) => {
                if (del.status) {
                    return unitService.countUnit(query);
                }
            })
            .then((count) => {
                if (count >= 0) {
                    return courseService.updateCourse(courseQuery, { "unit": Number(count) });
                }
            })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                throw err;
            })
    }

}

module.exports = new UnitController;