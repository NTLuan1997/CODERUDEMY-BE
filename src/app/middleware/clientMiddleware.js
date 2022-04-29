const ObjectId = require("mongodb").ObjectId;
const unitService = require('../services/unitService');
const bcrypt = require('bcrypt');
const clientService = require('../services/clientService');
const lessonService = require('../services/lessonService');

const Client = {
    Name: String,
    Email: String,
    Password: String,
    Gender: String,
    DateOfBirth: Date,
    Phone: String,
    Address: String,
    Thumbnail: String,
    registerCourse: Array
};

function courseDetail(req, res, next) {
    req.course = req.body;
    let unitQuery = {"courseId": {"$eq": String(req.body._id)}};

    unitService.findUnit(unitQuery)
    .then((units) => {
        req.course.units = units;
        next();

    })
    .catch((err) => {
        return res.status(405).json({status: false, message: "method failed"});
    })
}

function courseLesson(req, res, next) {
    if(Array.isArray(req.course.units) && req.course.units.length ) {
        for(let i = 0; i <= (req.course.units.length - 1); i++) {
            let lessonQuery = { "unitId": { "$eq": String(req.course.units[i]._id) } };

            lessonService.findLesson(lessonQuery)
            .then(function(lesson) {
                req.course.units[i].lessons = lesson;
                if(i == (req.course.units.length - 1)) {
                    next();
                }
            })
            .catch((err) => {
                throw err;
            })
        }
    } else {
        req.course.units = [];
        next();
    }
}

function client(req, res, next) {
    if(req.params.id) {
        req.findClientById = {"_id": {"$eq": new ObjectId(req.params.id)}};
        next();
    }

    if(req.body.Type == 'Create') {
        delete req.body.Code;
        delete req.body.Type;

        req.body.Password = bcrypt.hashSync(req.body.Password, 10);
        Object.assign(Client, req.body);
        req.Client = Client;
        next();
    }

    // if(req.body.Type = "Update") {
    //     delete req.body.Type;
    //     req.queryUpdate = {"_id": {"$eq": new ObjectId(req.body.Code)}};
    //     delete req.body.Code;

    //     req.body.Password = bcrypt.hashSync(req.body.Password, 10);
    //     Object.assigin(Client, req.body);
    //     req.Client = Client;
    //     next();
    // }

}



module.exports = { client, courseDetail, courseLesson };
