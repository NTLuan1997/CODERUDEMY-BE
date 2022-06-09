const courseService = require("../services/courseService");
const unitService = require("../services/unitService");

class Course {

    constructor() { }

    Functions(req, res) {
        function edit() {
            courseService.edit(req.condition, req.course)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function find() {
            courseService.find(req.condition)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function limited() {
            courseService.limit(req.limited, req.start)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function save() {
            courseService.saved(req.course)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function remove() {
            courseService.delete(req.condition)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        if(req.type === "Delete"){remove()}
        if(req.type === "Edit" || req.type === "Thumbnail" || req.type === "Status"){edit()}
        if(req.type === "Find"){find()}
        if(req.type === "Register"){save()}
        if(req.type === "Limited") {limited()}
    }

    functionsUnit(req, res) {
        function limit() {
            unitService.limit(req.courseCondition, req.limited, req.start)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function save() {
            res.status(200).json({status: true});
        }

        if(req.type === "limited") { limit() }
        if(req.type === "Register") { save() }
    }

}

module.exports = new Course;