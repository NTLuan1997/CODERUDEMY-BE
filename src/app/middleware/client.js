const ObjectId = require("mongodb").ObjectId;
const JWT = require("../utils/jwt");

const Obj = {
    Name: "",
    Email: "",
    Gender: "",
    DateOfBirth: "",
    Phone: "",
    Address: ""
};

const Thumbnail = {
    Thumbnail: ""
}

const RegisterCourse = {
    RegisterCourse: []
}

class Client {
    condition;

    constructor() { }

    edit(model, req, res, next) {

        if(model.Func === "Information") {
            delete model.Func;
            req.type = "Edit";
            req.client = model;
        }

        if(model.Func === "Thumbnail") { }

        if(model.Func === "RegisterCourse") { }
        next();
    }
}

module.exports = new Client;