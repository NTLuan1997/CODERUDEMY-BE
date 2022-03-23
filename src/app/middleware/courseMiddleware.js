const ObjectId = require("mongodb").ObjectId;
let course = {
    courseName: null,
    author: null,
    type: null,
    coin: null,
    createDate: null,
    updateDate: null,
    description: null,
    thumbnail: null,
    id: null,
};

// Middle ware course.

function converQuerySingle(req, res, next) {
    req.id = req.body.id;
    next();
}

function converInforEdit(req, res, next) {
    Object.assign(course, req.body);
    delete course.id;
    course.coin = Number(course.coin);
    course.createDate = new Date(course.createDate).toISOString();
    course.updateDate = new Date(course.updateDate).toISOString();
    req.courseQuery = { "_id": { $eq: new ObjectId(req.body.id) } };
    req.courseBody = course;
    next();
}

function converInforNew(req, res, next) {
    Object.assign(course, req.body);
    delete course.id;
    course.coin = Number(course.coin);
    course.createDate = new Date(course.createDate).toISOString();
    course.updateDate = new Date(course.updateDate).toISOString();
    req.courseBody = course;
    next();
}

function converInforRemove(req, res, next) {
    req.courseQuery = { "_id": { $eq: new ObjectId(req.body.id) } };
    next();
}

// Middleware unit.
function converPageUnit(req, res, next) {
    req.limit = req.query.limit;
    req.start = req.query.start;
    req.unitQuery = { "courseId": { "$eq": req.query.courseId } };
    next();
}

module.exports = {
    converQuerySingle,
    converInforNew,
    converInforEdit,
    converInforRemove,
    converPageUnit
};