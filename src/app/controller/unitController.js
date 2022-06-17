const CourseService = require("../services/CourseService");
const UnitService = require("../services/UnitService");
class UnitController {

    constructor() { }

    Functions(req, res) {

        function modified() {
            UnitService.update(req.condition, req.unit)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }
        
        function find() {
            UnitService.find(req.condition)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function saved() {
            UnitService.saved(req.unit)
            .then((result) => {
                if(result?.status) {
                    return UnitService.count(req.conditionUnit);
                }
            })
            .then((count) => {
                return CourseService.edit(req.conditionCourse, {"Unit": count});
            })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }
        
        if(req.type === "Find"){find()}
        if(req.type === "modified"){modified()}
        if(req.type === "createUnit"){saved()}
    }

}

module.exports = new UnitController;