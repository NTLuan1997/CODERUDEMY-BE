const unitService = require("../services/unitService");

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

module.exports = new UnitController;