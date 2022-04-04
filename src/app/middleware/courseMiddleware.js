const ObjectId = require("mongodb").ObjectId;

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

// COURSE

function converQuerySingle(req, res, next) {
    req.id = req.body.id;
    next();
}

function courseMapper(req, res, next) {
    Object.assign(course, req.body);
    if (req.body.id) {
        req.courseQuery = { "_id": { $eq: new ObjectId(req.body.id) } };
    }

    course.unit = Number(course.unit);
    course.createDate = new Date(course.createDate).toISOString();
    course.updateDate = new Date(course.updateDate).toISOString();
    delete course.id;

    req.courseBody = course;
    next();
}

function converInforRemove(req, res, next) {
    req.courseQuery = { "_id": { $eq: new ObjectId(req.body.id) } };
    next();
}

// UNIT
function converPageUnit(req, res, next) {
    req.limit = req.query.limit;
    req.start = req.query.start;
    req.unitQuery = { "courseId": { "$eq": req.query.courseId } };
    next();
}

function converUnit(req, res, next) {
    Object.assign(unit, req.body);
    if (req.body.id) {
        req.unitQuery = { "_id": { "$eq": new ObjectId(req.body.id) } }
    }
    unit.amountLesson = Number(unit.amountLesson);
    unit.createDate = new Date(unit.createDate).toISOString();
    unit.updateDate = new Date(unit.updateDate).toISOString();
    delete unit.id;
    req.unitBody = unit;
    next();
}

function converQueryUnit(req, res, next) {
    req.unitQuery = { "_id": { "$eq": new ObjectId(req.body.id) } }
    next();
}

// LESSON

function converPageLesson(req, res, next) {
    req.limit = req.query.limit;
    req.start = req.query.start;
    req.lessonQuery = { "unitId": { "$eq": req.query.unitId } };
    next();
}

function converLesson(req, res, next) {
    Object.assign(lesson, req.body);
    if (req.body.id) {
        req.lessonQuery = { "_id": { "$eq": new ObjectId(req.body.id) } };
        delete lesson.id;
    }
    lesson.createDate = new Date(lesson.createDate).toISOString();
    lesson.updateDate = new Date(lesson.updateDate).toISOString();
    req.lessonBody = lesson;
    next();
}

function converQueryLesson(req, res, next) {
    req.lessonQuery = { "_id": { "$eq": new ObjectId(req.body.id) } }
    next();
}

module.exports = {
    converQuerySingle,
    courseMapper,
    converInforRemove,
    converPageUnit,
    converUnit,
    converQueryUnit,
    converPageLesson,
    converLesson,
    converQueryLesson
};
