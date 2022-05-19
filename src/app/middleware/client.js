const ObjectId = require("mongodb").ObjectId;
const JWT = require("../utils/jwt");

const Obj = {
    Name: "",
    Email: "",
    Password: "",
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
        if(model?.token) {
            let clientId = JWT.decoded(model.token).payload._id;
            this.condition = {"_id": {"$eq": new ObjectId(clientId)}}
        }

        if(model.Func === "Information") {
            delete model.Func;
            Object.assign(Obj, model);
            req.client = Obj;
            req.condition = this.condition;
            req.type = "Edit";
        }

        if(model.Func === "Thumbnail") { }

        if(model.Func === "RegisterCourse") { }
        next();
    }

    find(req, res, next) {
        req.type = "Find";
        next();
    }
}

module.exports = new Client;