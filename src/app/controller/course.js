const courseService = require("../services/courseService");
const unitService = require("../services/unitService");

class Course {

    constructor() { }

    functionsCourse(req, res) {
        function limit() {
            courseService.limit(req.limited, req.start)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        if(req.type === "limited") { limit() }
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

        if(req.type === "limited") { limit() }
    }

}

module.exports = new Course;