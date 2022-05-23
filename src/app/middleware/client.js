const ObjectId = require("mongodb").ObjectId;
const JWT = require("../utils/jwt");
const BCRYPT = require("../utils/bcrypt");

const client = {
    Name: "",
    Email: "",
    Gender: "",
    DateOfBirth: "",
    Phone: "",
    Password: "",
    Address: ""
};

// const Password = {
//     Password: ""
// }

// const Thumbnail = {
//     Thumbnail: ""
// }

// const RegisterCourse = {
//     RegisterCourse: []
// }

class Client {
    condition;

    constructor() { }

    edit(model, req, res, next) {
        req.type = "Edit";

        if(model.Func === "Information") {
            delete model.Func;
            req.client = model;
        }

        if(model.Func === "Password") {
            delete model.Func;
            req.client = { Password: BCRYPT.hash(model.Password) };
        }

        if(model.Func === "Thumbnail") {
            delete model.Func;
            req.client = model;
        }
        next();
    }

    register(model, req, res, next) {
        Object.assign(client, model);
        client.Password = BCRYPT.hash(model.Password);
        req.client = client;
        next();
    }
}

module.exports = new Client;