const ObjectId = require("mongodb").ObjectId;
const jwt = require("../utils/jwt");
const userService = require("../services/userService");

let client = {
    "user_name": null,
    "password": null,
    "email": null,
    "status": null,
    "dateOfBirth": null,
    "role": null,
    "courses": null
}

function clientMapper(req, res, next) {
    if (req.body) {
        Object.assign(client, req.body);
        client.dateOfBirth = new Date(client.dateOfBirth).toISOString();
        req.clientBody = client;
        next();
    }
}

function clientAccept(req, res, next) {
    if(req.hasOwnProperty('clientBody')) {
        let query = {"email": { $eq: req.clientBody.email }, "password": { $eq: req.clientBody.password }};
        userService.isUser(query)
        .then((user) => {
            if(user) {
                req.clientToken = jwt.generation(user["_id"]);
                next();

            } else {
                res.status(404).json({status: false, type: "User Not Found", message: "Not Find User"});
            }
        })
        .catch((err) => {
            return res.status(500).json({status: false, type: "Method Failed", message: "Find User Failed"});
        })

    } else {
        return res.status(406).json({status: false, type: "Not Accept", message: "Not Client Body Request"});
    }
}

function mapperUser(req, res, next) {
    let values = Object.values(req.body).length;
    req.mongoQuery = {
        "_id": {
            $eq: (req.body.id && req.body.id != "create") ? new ObjectId(req.body.id) : 0
        }
    };

    if (values > 1) {
        req.mongoBody = {
            user_name: null,
            email: null,
            password: null,
            dateOfBirth: null,
            role: null,
            status: null,
            courses: null
        };
        Object.assign(req.mongoBody, req.body);
        delete req.mongoBody.id;
    }

    next();
}

function mapperUserQuery(req, res, next) {
    let query = { "_id": { "$eq": new ObjectId(req.body.id) } };
    req.userQuery = query;
    next();
}

module.exports = { mapperUser, clientMapper, clientAccept, mapperUserQuery };