const ObjectId = require("mongodb").ObjectId;
const clientService = require("../services/clientService");
const userService = require("../services/userService");
const JWT = require("../utils/jwt");
const Client = require("./client");
class Middleware {

    constructor() { }

    transaction(req, res, next) {
        if(req.headers.authorization && req.headers.authorization !== "Empty") {
            if(JWT.verify(req.headers.authorization.split(' ')[1])) {
                let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
                req.condition = {"_id": {"$eq": new ObjectId(token)}};

                if(role) {
                    if(req.headers.comment) {
                        let {type, limited, start} = JSON.parse(req.headers.comment);
                        if(type && type === "limited") {
                            req.type = type;
                            req.limited = limited;
                            req.start = start;
                            next();
                        }
                    }
                    
                    console.log(req.body);
                    console.log(req.headers);

                } else {
                    clientService.exists(req.condition)
                    .then((result) => {
                        if(result.status) {
                            if(req.body.Type === "Edit") {
                                delete req.body.Type;
                                Client.edit(req.body, req, res, next);
                            }
            
                            if(req.method === "GET") {
                                req.type = "Find";
                                next();
                            }

                        } else {
                            return res.status(401).json({status: false, type:"authorizedInconrrect"});
                        }
                    })
                    .catch((err) => {
                        throw err;
                    })
                }

            } else {
                return res.status(401).json({status: false, type:"authorizedExperience"});
            }

        } else {
            if(req.body.Type === "Register") {
                let condition = {"Email": {"$eq": req.body.Email}};
                clientService.exists(condition)
                .then((result) => {
                    if(result?.status) {
                        return res.status(404).json({status: false, type: "emailRegisterAlready"});

                    } else {
                        req.type = "Register";
                        delete req.body.Type;
                        delete req.body.Func;
                        Client.register(req.body, req, res, next);
                    }
                })
                .catch((err) => {
                    throw err;
                })
            }
        }
    }
}

module.exports = new Middleware;