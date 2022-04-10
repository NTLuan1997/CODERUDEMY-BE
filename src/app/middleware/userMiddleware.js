const ObjectId = require("mongodb").ObjectId;
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

function mapperUserLogin(req, res, next) {
    req.email = req.body.email;
    req.password = req.body.password;
    next();
}

module.exports = { mapperUser, clientMapper, mapperUserQuery, mapperUserLogin };