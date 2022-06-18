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

        function restore() {
            UnitService.restore(req.condition, req.unit)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function remove() {

            UnitService.remove(req.condition)
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

            // UnitService.find(req.condition)
            // .then((result) => {
            //     if(result?.length) {
            //         condition = {"_id": {"$eq": result[0].CourseId}};
            //         return true;
            //     } else {
            //         console.log("Not find element");
            //     }
            // })
            // .then((status) => {
            //     if(status) {
            //         return UnitService.remove(req.condition);
            //     }
            // })
            // .then((result) => {

            // })
            // .catch((err) => {
            //     throw err;
            // })
        }
        
        if(req.type === "createUnit"){saved()}
        if(req.type === "remove"){remove()}
        if(req.type === "find"){find()}
        if(req.type === "modified"){modified()}
        if(req.type === "restore"){restore()}
    }

}

module.exports = new UnitController;