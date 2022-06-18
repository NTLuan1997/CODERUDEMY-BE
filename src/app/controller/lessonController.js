const LessonService = require("../services/LessonService");
const UnitService = require("../services/UnitService");

class LessonController {

    constructor() { }

    Functions(req, res) {
        function modified() {
            LessonService.update(req.condition, req.lesson)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

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
            LessonService.saved(req.lesson)
            .then((result) => {
                if(result?.status) {
                    return LessonService.count(req.conditionLesson);
                }
            })
            .then((count) => {
                if(count >= 0) {
                    return UnitService.update(req.conditionUnit, {"Lesson": count});
                }
            })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function restore() {
            LessonService.restore(req.condition, req.lesson)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function remove() {
            LessonService.remove(req.condition)
            .then((result) => {
                if(result?.status) {
                    return LessonService.count(req.conditionLesson);
                }
            })
            .then((count) => {
                if(count >= 0) {
                    return UnitService.update(req.conditionUnit, {"Lesson": count});
                }
            })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        if(req.type === "createLesson"){saved()}
        if(req.type === "find"){find()}
        if(req.type === "modified"){modified()}
        if(req.type === "restore"){restore()}
        if(req.type === "remove"){remove()}
    }

}

module.exports = new LessonController;