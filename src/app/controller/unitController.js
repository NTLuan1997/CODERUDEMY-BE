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
                if (count) {
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
        unitService.deleteUnit(req.unitQuery)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                throw err;
            })
    }

}

module.exports = new UnitController;