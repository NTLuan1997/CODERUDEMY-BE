const LessonService = require("../services/lessonService");
const UnitService = require("../services/unitService");

class LessonController {

    constructor() { }

    Functions(req, res) {

        function find() {
            LessonService.find(req.condition)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function saved() {
            LessonService.saved(req.unit)
            .then((result) => {
                if(result?.status) {
                    return LessonService.count(req.UnitId);
                }
            })
            .then((count) => {
                if(count) {
                    let unit = {"Lesson": count};
                    return UnitService.update(req.condition, unit);
                }
            })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        if(req.type === "CreateLesson"){saved()}
        if(req.type === "Find"){find()}
    }

}

module.exports = new LessonController;