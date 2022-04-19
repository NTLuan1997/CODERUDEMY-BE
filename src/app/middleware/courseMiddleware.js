const ObjectId = require("mongodb").ObjectId;
const courseService = require("../services/courseService");
const unitService = require("../services/unitService");

let course = {
    courseName: null,
    author: null,
    type: null,
    unit: null,
    createDate: null,
    updateDate: null,
    description: null,
    thumbnail: null,
    id: null,
};

let unit = {
    courseId: null,
    unitName: null,
    amountLesson: null,
    status: null,
    createDate: null,
    updateDate: null
}

let lesson = {
    unitId: null,
    lessonName: null,
    lessonContent: null,
    status: null,
    thumbnail: null,
    createDate: null,
    updateDate: null
}

// SERVER
    // COURSE

    function courseMapper(req, res, next) {
        if (req.body.id) {
            req.courseQuery = { "_id": { $eq: new ObjectId(req.body.id) } };
        }

        if (req.body.courseName) {
            Object.assign(course, req.body);
            course.unit = Number(course.unit);
            course.createDate = new Date(course.createDate).toISOString();
            course.updateDate = new Date(course.updateDate).toISOString();
            delete course.id;
            req.courseBody = course;
        }

        next();
    }

    function courseAcceptRemove(req, res, next) {
        if (req.body.id) {
            let query = { "_id": { "$eq": new ObjectId(req.body.id) } };
            courseService.findOneCourse(query)
                .then((course) => {
                    if (course) {
                        if (!course?.unit) {
                            next();

                        } else {
                            return res.status(405).json({ status: false, message: "Accepted" });
                        }
                    } else {
                        return res.status(405).json({ status: false, message: "Missing data" });
                    }
                })
                .catch((err) => {
                    throw err;
                })
        } else {
            return res.status(405).json({ status: false, message: "Don't have body" });
        }
    }

    // UNIT

    function unitMapper(req, res, next) {
        if (req.body?.id) {
            req.unitQuery = { "_id": { "$eq": new ObjectId(req.body.id) } }
        }

        if (req.query.courseId) {
            req.unitCourseQuery = { "courseId": { "$eq": req.query.courseId } };
        }

        if (req.body.unitName) {
            Object.assign(unit, req.body);
            unit.amountLesson = Number(unit.amountLesson);
            unit.createDate = new Date(unit.createDate).toISOString();
            unit.updateDate = new Date(unit.updateDate).toISOString();
            delete unit.id;

            if (unit.courseId) {
                req.unitCourseQuery = { "courseId": { "$eq": unit.courseId } };
                req.courseQuery = { "_id": { "$eq": new ObjectId(unit.courseId) } };
            }

            req.unitBody = unit;
        }
        next();
    }

    function unitAcceptRemove(req, res, next) {
        if (req.body.id) {
            let query = { "_id": { "$eq": new ObjectId(req.body.id) } };
            unitService.findOneUnit(query)
                .then((unit) => {
                    if (unit) {
                        if (!unit?.amountLesson) {
                            next();
                        } else {
                            return res.status(405).json({ status: false, message: "Accepted" });
                        }
                    } else {
                        return res.status(405).json({ status: false, message: "Missing data" });
                    }
                })
                .catch((err) => {
                    console.log(err);
                })

        } else {
            return res.status(405).json({ status: false, message: "Don't have body" });
        }
    }

    // LESSON
    function lessonMapper(req, res, next) {
        if (req.body.id) {
            req.lessonQuery = { "_id": { "$eq": new ObjectId(req.body.id) } }
        }

        if (req.body.unitId) {
            req.unitQuery = { "unitId": { "$eq": req.query.unitId } };
        }

        if (req.body.lessonName) {
            Object.assign(lesson, req.body);
            lesson.createDate = new Date(lesson.createDate).toISOString();
            lesson.updateDate = new Date(lesson.updateDate).toISOString();
            delete lesson.id;
            req.lessonBody = lesson;
        }

        next();
    }

module.exports = {
    courseMapper,
    courseAcceptRemove,
    unitMapper,
    unitAcceptRemove,
    lessonMapper
};
