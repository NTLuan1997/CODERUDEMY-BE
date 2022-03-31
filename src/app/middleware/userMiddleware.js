const ObjectId = require("mongodb").ObjectId;

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
            age: null,
            role: null,
            status: null,
            skills: null
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

module.exports = { mapperUser, mapperUserQuery, mapperUserLogin };