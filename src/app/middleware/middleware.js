const ObjectId = require("mongodb").ObjectId;
const clientService = require("../services/clientService");
const userService = require("../services/userService");
const JWT = require("../utils/jwt");
const BCRYPT = require("../utils/bcrypt");
const Client = require("./client");
class Middleware {

    constructor() { }

    clientTransaction(req, res, next) {

        function checkExists(condition) {
            return new Promise((resolve, reject) => {
                clientService.exists(condition)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                })
            })
        }

        if(req.headers.authorization && req.headers.authorization !== "Empty") {
            if(JWT.verify(req.headers.authorization.split(' ')[1])) {
                let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
                req.condition = {"_id": {"$eq": new ObjectId(token)}};

                if(role) {
                    if(req.headers.comment) {
                        let {type, token, limited, start} = JSON.parse(req.headers.comment);

                        if(type && type === "limited") {
                            req.type = type;
                            req.limited = limited;
                            req.start = start;
                            next();
                        }

                        if(type && type === "findClientByID") {
                            req.type = "Find";
                            req.condition = {"_id": {"$eq": token}};
                            next();
                        }
                    }

                    if(req.body.Type === "Thumbnail") {
                        req.condition = {"_id": {"$eq": req.body.Token}};
                        delete req.body.Type;
                        delete req.body.Token;
                        Client.edit(req.body, req, res, next);
                    }

                    if(req.body.Type === "Register") {
                        let condition = {"Email": {"$eq": req.body.Email}};
                        checkExists(condition)
                        .then((result) => {
                            if(result?.status) {
                                return res.status(404).json({status: false, type: "emailRegisterAlready"});

                            } else {
                                req.system = "manager";
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

    courseTransaction(req, res, next) {
        if(req.headers.authorization && req.headers.authorization !== "Empty") {
            if(JWT.verify(req.headers.authorization.split(' ')[1])) {
                let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
                req.condition = {"_id": {"$eq": token}};

                if(role) {
                    if(req.body.Func || req.body.Type) {
                        if(role === "admin") {
                            if(req.body.Func === "Register") {
                                delete req.body.Func;
                                req.type = "Register";
                                req.course = req.body;
                                next();
                            }

                            if(req.body.Func === "Edit") {
                                req.condition = {"_id": {"$eq": req.body.Id}};
                                delete req.body.Func;
                                delete req.body.Id;
                                req.type = "Edit";
                                req.course = req.body;
                                next();
                            }

                            if(req.body.Type === "Delete") {
                                req.type = "Delete";
                                req.condition = {"_id": {"$eq": req.body.Id}};
                                next();
                            }

                        } else {
                            console.log("permission");
                        }

                    } else {
                        if(req.headers.comment) {
                            let {type, token, id, limited, start} = JSON.parse(req.headers.comment);
                            if(type === "Limited") {
                                req.type = "Limited";
                                req.limited = limited;
                                req.start = start;
                            }

                            if(type === "Find") {
                                req.type = "Find";
                                req.condition = {"_id": {"$eq": id}};
                            }

                            next();
                        }
                    }
                }

            } else {
                return res.status(404).json({status: false, type: "tokenExperience"});
            }
        } else {
            return res.status(404).json({status: false, type: "tokenBlank"});
        }
    }

    unitTransactions(req, res, next) {
        if(req.headers.authorization && req.headers.authorization !== "Empty") {
            if(JWT.verify(req.headers.authorization.split(' ')[1])) {
                let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
                req.condition = {"_id": {"$eq": new ObjectId(token)}};

                if(req.headers.comment) {
                    let {type, token, id, limited, start} = JSON.parse(req.headers.comment);
                    req.type = "limited";
                    req.limited = limited;
                    req.start = start;
                    req.courseCondition = {"CourseId": {"$eq": id}};
                    console.log( req.courseCondition);

                }
                next();

            } else {
                return res.status(404).json({status: false, type: "tokenExperience"});
            }

        } else {
            return res.status(404).json({status: false, type: "tokenBlank"});
        }
    }

    userTransaction(req, res, next) {
        if(req.headers.authorization && req.headers.authorization !== "Empty") {
            if(JWT.verify(req.headers.authorization.split(' ')[1])) {
                let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
                req.condition = {"_id": {"$eq": token}};

                if(role) {
                    if(req.body.Type) {
                        if(role === "admin") {
                            if(req.body.Type === "Register") {
                                delete req.body.Type;
                                req.type = "Register";

                                userService.exists({"Email": {"$eq": req.body.Email}})
                                .then((result) => {
                                    if(!result) {
                                        req.user = req.body;
                                        next();
                                    } else {
                                        return res.status(404).json({status: false, type: "emailRegisterAlready"});
                                    }
                                })
                                .catch((err) => {
                                    throw err;
                                })
                            }

                            if(req.body.Type === "Edit") {
                                delete req.body.Type;
                                req.type = "Edit";

                                userService.find({"Email": {"$eq": req.body.Email}})
                                .then((result) => {
                                    let obj = result[0].toObject();
                                    req.condition = {"_id": {"$eq": obj._id}};
                                    console.log(req.body.Password);
                                    
                                    if(!BCRYPT.compare(req.body.Password, obj.Password)) {
                                        req.body.Password = BCRYPT.hash(req.body.Password);
                                    }
                                    req.user = req.body;
                                    next();
                                })
                                .catch((err) => {
                                    throw err;
                                })
                            }

                            if(req.body.Type === "Thumbnail") {
                                req.type = "Thumbnail";
                                req.condition = {"_id": {"$eq": req.body.Id}};
                                req.user = {"Thumbnail": req.body.Destination};
                                next();
                            }

                            if(req.body.Type === "Delete") {
                                req.type = "Delete";
                                req.condition = {"_id": {"$eq": req.body.Id}};
                                next();
                            }
                        }

                    } else {
                        let {type, token, limited, id, start} = JSON.parse(req.headers.comment);
                        if(type === "limited") {
                            req.type = "limited";
                            req.limited = limited;
                            req.start = start;
                            next();
                        }

                        if(type === "Find") {
                            req.type = "Find";
                            req.condition = {"_id": {"$eq": id}};
                            next();
                        }
                    }
                }

            } else {
                return res.status(404).json({status: false, type: "tokenExperience"});
            }
        } else {
            return res.status(404).json({status: false, type: "tokenBlank"});
        }
    }
}

module.exports = new Middleware;