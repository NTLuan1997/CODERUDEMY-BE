const ObjectId = require("mongodb").ObjectId;
const JWT = require("../utils/jwt");
const Client = require("./client");

class Middleware {

    constructor() { }

    client(req, res, next) {
        if(req.headers.authorization) {
            let token = req.headers.authorization.split(' ')[1];
            if(JWT.verify(token)) {
                if(req.body.Type === "Edit") {
                    delete req.body.Type;
                    Client.edit(req.body, req, res, next);
                }

                if(req.method === "GET") {
                    req.type = "Find";
                    req.condition = {"_id": {"$eq": new ObjectId(JWT.decoded(token).payload.token)}};
                }
                next();

            } else {
                res.status(401).json({status: false, type:"authorizedExperience"});

            }
        } else {
            res.status(401).json({status: false, type:"Unauthorized"});
        }
    }
}

module.exports = new Middleware;