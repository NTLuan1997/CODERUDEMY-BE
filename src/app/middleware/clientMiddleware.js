const ObjectId = require("mongodb").ObjectId;
const unitService = require('../services/unitService');
const JWT = require("../utils/jwt");
const BCRYPT = require("../utils/bcrypt");
const clientService = require('../services/clientService');
const lessonService = require('../services/lessonService');

const Client = {
    Name: "",
    Email: "",
    Password: "",
    Gender: "",
    DateOfBirth: "",
    Phone: "",
    Address: "",
    Thumbnail: ""
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

    if(req.body.Type === "Delete") {
        req.Func = req.body.Func;
        req.Query = {"_id": {"$eq": new ObjectId(req.body.id)}};
        next();
    }

    if(req.body.Type === "Register-account") {
        if(req.body.hasOwnProperty("Code")) {
            delete req.body.Code;
        }

        let query = {"Email": {$eq: req.body.Email}};
        req.Func = req.body.Func;

        delete req.body.Func;
        delete req.body.Type;

        clientService.exists(query)
        .then((status) => {
            if(status) {
                return res.status(404).json({status: false, type: "Email_register_already", message: "Account already exist"});

            } else {
                req.body.Password = BCRYPT.hash(req.body.Password, 10);
                Object.assign(Client, req.body);
                req.Client = Client;
                next();
            }
        })
        .catch((err) => {
            throw err;
        })
    }

    if(req.body.Type === "Register-course") {
        req.Query = {"_id": {"$eq": new ObjectId(req.body.id)}};
        req.Client = {RegisterCourse: req.body.register};
        next();
    }

    if(req.body.Type == 'Update') {
        let query = {"_id": {"$eq": new ObjectId(req.body.Code)}};
        req.Func = req.body.Func;

        delete req.body.Func;
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
