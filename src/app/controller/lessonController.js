const lessonService = require("../services/lessonService");
const unitService = require("../services/unitService");
const ObjectId = require("mongodb").ObjectId;

class LessonController {

    constructor() { }

    // Method render template.

    renderLesson(req, res) {
        res.render("components/courses/lesson", { show: true });
    }

    renderLessonDetail(req, res) {
        res.render("components/courses/lessonDetail", { show: true });
    }

    // Method support api Unit.

    findSingleLessson(req, res) {
        lessonService.findOneLesson(req.lessonQuery)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                throw err;
            })
    }

    pageLesson(req, res) {
        lessonService.findLimitLesson(req.lessonQuery, req.limit, req.start)
            .then((data) => {
                res.status(200).json({
                    "lessons": data[0],
                    "length": data[1]
                })
            })
            .catch((err) => {
                throw err;
            })
    }

    newLesson(req, res) {
        lessonService.newLesson(req.lessonBody)
            .then((data) => {
                return data;
            })
            .then((state) => {
                if (state.status) {
                    let query = { "unitId": { "$eq": req.lessonBody.unitId } };
                    return lessonService.countLesson(query);
                } else {
                    state.message = "Count failed";
                    res.status(200).json(state);
                }
            })
            .then((count) => {
                if (count >= 0) {
                    let query = { "_id": { "$eq": new ObjectId(req.lessonBody.unitId) } };
                    let unitBody = { "amountLesson": Number(count) };
                    return unitService.updateUnit(query, unitBody);
                }
            })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                throw err;
            })
    }

    editLesson(req, res) {
        lessonService.updateLesson(req.unitQuery, req.unitBody)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                throw err;
            })
    }

    removeLesson(req, res) {
        lessonService.deleteLesson(req.unitQuery)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                throw err;
            })
    }

}

module.exports = new LessonController;