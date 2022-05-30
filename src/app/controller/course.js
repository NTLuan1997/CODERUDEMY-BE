const courseService = require("../services/courseService");

class Course {

    constructor() { }

    functions(req, res) {
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

}

module.exports = new Course;