const unitService = require('../services/unitService');
const lessonService = require('../services/lessonService');

function courseDetail(req, res, next) {
    req.course = req.body;
    let unitQuery = {"courseId": {"$eq": String(req.body._id)}};

    unitService.findUnit(unitQuery)
    .then((unit) => {
        req.course.unit = unit;
        next();

    })
    .catch((err) => {
        return res.status(405).json({status: false, message: "method failed"});
    })
}

function courseLesson(req, res, next) {
    if(Array.isArray(req.course.unit)) {
        for(let i = 0; i <= (req.course.unit.length - 1); i++) {
            req.course.unit[i].lessons = [1,2,3];
            let lessonQuery = { "unitId": { "$eq": String(req.course.unit[i]._id) } };

            lessonService.findLesson(lessonQuery)
            .then(function(lesson) {
                req.course.unit[i].lessons = lesson;
                if(i == (req.course.unit.length - 1)) {
                    next();
                }
            })
            .catch((err) => {
                throw err;
            })
        }
    }
}



module.exports = { courseDetail, courseLesson };
