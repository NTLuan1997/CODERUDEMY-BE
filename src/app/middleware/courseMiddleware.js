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

function converBody(req, res, next) {
    let keys = Object.keys(req.body);
    let values = Object.values(req.body);

    if (keys.length > 1) {
        Object.assign(course, req.body);
        delete course.id;
        course.coin = Number(course.coin);
        course.createDate = new Date(course.createDate).toISOString();
        course.updateDate = new Date(course.updateDate).toISOString();
        req.courseQuery = { "_id": { $eq: new ObjectId(req.body.id) } };
        req.courseBody = course;

    } else {
        if (keys.includes("id")) {
            req.id = values[0];
        }
    }

    next();
}

module.exports = { converBody };
