const ObjectId = require("mongodb").ObjectId;
const unitService = require('../services/unitService');
const bcrypt = require('bcrypt');
const Bcrypt = require("../utils/bcrypt");
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
    Thumbnail: String
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

    if(req.body.Type === "Delete") {
        req.Query = {"_id": {"$eq": new ObjectId(req.body.id)}};
        next();
    }

    if(req.body.Type === "Register-account") {
        delete req.body.Type;
        Client.Thumbnail = "";
        req.body.Password = bcrypt.hashSync(req.body.Password, 10);
        Object.assign(Client, req.body);
        req.Client = Client;
        next();
    }

    if(req.body.Type === "Register-course") {
        req.Query = {"_id": {"$eq": new ObjectId(req.body.id)}};
        req.Client = {RegisterCourse: req.body.register};
        next();
    }

    if(req.body.Type == 'Update') {
        let query = {"_id": {"$eq": new ObjectId(req.body.Code)}};
        delete req.body.Type;
        
        clientService.findOneClient(query)
        .then((client) => {
            if(Object.keys(client).length) {
                delete req.body.Code;
                req.Query = query;

                if(req.body.Password === client.Password) {
                    delete req.body.Password;
                    delete Client.Password;
                    Object.assign(Client, req.body);
                    req.Client = Client;

                } else {
                    Object.assign(Client, req.body);
                    Client.Password = Bcrypt.hash(Client.Password);
                    req.Client = Client;

                }
                next();

            } else {
                return res.status(404).json({status: false, message: 'Not Found Client'});
            }
        })
        .catch((err) => {
            throw err;
        })

    }

    if(req.body.Type === "Thumbnail") {
        req.Query = {"_id": {"$eq": new ObjectId(req.body._id)}};
        req.Client = {"Thumbnail": req.body.Thumbnail};
        next();
    }

}



module.exports = { client, courseDetail, courseLesson };
