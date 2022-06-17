const CourseService = require("../services/CourseService");
const UnitService = require("../services/unitService");
class UnitController {

    constructor() { }

    Functions(req, res) {

        function edit() {
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
                    return UnitService.count(req.condition);
                }
            })
            .then((count) => {
                let query = {"_id": {"$eq": req.courseId}};
                return CourseService.edit(query, {"Unit": count});
            })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }
        
        if(req.type === "Edit" || req.type === "Status"){edit()}
        if(req.type === "Find"){find()}
        if(req.type === "CreateUnit"){saved()}
    }

}

module.exports = new UnitController;