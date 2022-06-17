const CourseService = require("../services/CourseService");
const unitService = require("../services/unitService");

class Course {

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

        if(req.type === "Edit"){edit()}
        if(req.type === "Delete"){deleted()}
        if(req.type === "Find"){find()}
        if(req.type === "CreateCourse"){save()}
        if(req.type === "Limited") {limited()}
        if(req.type === "Restore"){restore()}
    }

}

module.exports = new Course;