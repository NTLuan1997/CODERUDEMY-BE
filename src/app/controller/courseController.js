const CourseService = require("../services/courseService");

class CourseController {

    constructor() { }

    Functions(req, res) {
        function edit() {
            CourseService.edit(req.condition, req.course)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function find() {
            CourseService.find(req.condition)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function limited() {
            CourseService.limit(req.condition, req.limited, req.start)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function save() {
            CourseService.saved(req.course)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function restore() {
            CourseService.restore(req.condition, req.user)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function deleted() {
            CourseService.delete(req.condition)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        if(req.type === "Delete"){deleted()}
        if(req.type === "Find"){find()}
        if(req.type === "Limited") {limited()}
        if(req.type === "Restore"){restore()}

        if(req.type === "Create"){save()}
        if(req.type === "Modified"){edit()}
    }

}

module.exports = new CourseController;