const ObjectId = require("mongodb").ObjectId;
const clientService = require("../services/clientService");
const userService = require("../services/UserService");
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

    // COURSE TRANSACTION
    CourseTransaction(req, res, next) {
        if(req.headers.authorization && req.headers.authorization !== "Empty") {
            if(JWT.verify(req.headers.authorization.split(' ')[1])) {
                let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
                req.condition = {"_id": {"$eq": token}};

                if(role) {
                    if(req.body?.Type || req.body?.Func) {
                        if(role === "Admin" || role === "Editer") {

                            if(req.body.Func === "Edit") {
                                req.condition = {"_id": {"$eq": req.body.Id}};
                                req.type = "Edit";

                                delete req.body.Func;
                                delete req.body.Id;
                                req.course = req.body;
                                next();
                            }

                            if(role === "Admin") {
                                if(req.body.Func === "CreateCourse") {
                                    delete req.body.Func;
                                    req.type = "CreateCourse";
                                    req.course = req.body;
                                    next();
                                }

                                if(req.body.Func === "Delete") {
                                    delete req.body.Func;
                                    req.condition = {"_id": {"$eq": req.body.Id}};
                                    if(req.body.Type === "Virtual") {
                                        req.type = "Edit";
                                        req.course = {"Status": false};
                                    }

                                    if(req.body.Type === "Really") {
                                        req.type = "Delete";
                                    }
                                    next();
                                }

                                if(req.body.Type === "Restore") {
                                    req.type = "Restore";
                                    req.condition = {"_id": {"$in": req.body.Tokens}};
                                    req.user = {"Status": true};
                                    next();
                                }
                            }
                        }

                    } else {
                        let {type, token, id, limited, start, status} = JSON.parse(req.headers.comment);
                        if(type === "Limited") {
                            req.type = "Limited";
                            req.limited = limited;
                            req.start = start;
                            req.condition = {Status: {"$eq": true}};
                            next();
                        }

                        if(type === "Find") {
                            req.type = "Find";
                            req.condition = "";
                            
                            if(id && status) {
                                req.condition = {"_id": {"$eq": id}, "Status": status};

                            } else if(id) {
                                req.condition = {"_id": {"$eq": id}};

                            } else {
                                req.condition = {"Status": status};
                            }
                            next();
                        }
                    }
                }

            } else {
                return res.status(404).json({status: false, type: "token-expired"});
            }
        } else {
            return res.status(404).json({status: false, type: "token-blank"});
        }
    }

    // UnitTransactions(req, res, next) {
    //     if(req.headers.authorization && req.headers.authorization !== "Empty") {
    //         if(JWT.verify(req.headers.authorization.split(' ')[1])) {
    //             let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
    //             req.condition = {"_id": {"$eq": new ObjectId(token)}};

    //             if(role) {
    //                 if(req.body.Func || req.body.Type) {
    //                     if(role === "Admin") {

    //                         if(req.body.Type === "CreateUnit") {
    //                             req.type = "CreateUnit";
    //                             req.courseId = req.body.CourseId;
    //                             req.condition = {"CourseId": {"$eq": req.body.CourseId}};
    //                             req.unit = req.body;
    //                             next();
    //                         }

    //                         if(req.body.Type === "Edit") {
    //                             delete req.body.Type;
    //                             delete req.body.CreateDate;

    //                             req.type = "Edit";
    //                             req.condition = {"_id": {"$eq": req.body.Id}};
    //                             delete req.body.Id;

    //                             req.unit = req.body;
    //                             next();
    //                         }

    //                         if(req.body.Type === "Status") {
    //                             delete req.body.Type;
    //                             req.condition = {"_id": {"$eq": req.body.Id}};
    //                             delete req.body.Id;

    //                             req.type = "Status";
    //                             req.unit = req.body;
    //                             next();
    //                         }

    //                     } else {
    //                         console.log("permission");
    //                     }

    //                 } else {
    //                     if(req.headers.comment) {
    //                         let {type, token, id, limited, start} = JSON.parse(req.headers.comment);
    //                         if(type === "Find") {
    //                             req.type = "Find";
    //                             req.condition = {"_id": {"$eq": id}};
    //                         }

    //                         if(type === "FindAll") {
    //                             req.type = "Find";
    //                             req.condition = {"CourseId": {"$eq": id}};
    //                         }

    //                         next();
    //                     }
    //                 }
    //             } else {
    //                 console.log("Not Find Role");
    //             }
    //         } else {
    //             return res.status(404).json({status: false, type: "tokenExperience"});
    //         }
    //     } else {
    //         return res.status(404).json({status: false, type: "tokenBlank"});
    //     }
    // }

    // LessonTransaction(req, res, next) {
    //     if(req.headers.authorization && req.headers.authorization !== "Empty") {
    //         if(JWT.verify(req.headers.authorization.split(' ')[1])) {
    //             let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
    //             req.condition = {"_id": {"$eq": token}};

    //             if(role) {
    //                 if(req.body.Type || req.body.Func) {
    //                     if(role === "Admin") {
    //                         if(req.body.Type === "CreateLesson") {
    //                             delete req.body.Type;
    //                             req.type = "CreateLesson";
    //                             req.condition = {"_id": {"$eq": req.body.UnitId}};
    //                             req.UnitId = {"UnitId": {"$eq": req.body.UnitId}};
    //                             req.lesson = req.body;
    //                             next();
    //                         }

    //                         if((req.body.Type === "Edit") || (req.body.Type === "Status")) {
    //                             req.type = "Edit";
    //                             req.condition = {"_id": {"$eq": req.body.LessonId}};
                                
    //                             delete req.body.Type;
    //                             delete req.body.LessonId;
    //                             req.lesson = req.body;
    //                             next();
    //                         }

    //                     } else {
    //                         console.log("permission");
    //                     }

    //                 } else {
    //                     let {type, token, limited, id, start} = JSON.parse(req.headers.comment);
    //                     if(type === "FindAll") {
    //                         req.type = "Find";
    //                         req.condition = {"UnitId": {"$eq": id}};
    //                     }

    //                     if(type === "Find") {
    //                         req.type = "Find";
    //                         req.condition = {"_id": {"$eq": id}};
    //                     }
    //                     next();
    //                 }

    //             } else {
    //                 return res.status(404).json({status: false, type: "roleBlank"});
    //             }
    //         } else {
    //             return res.status(404).json({status: false, type: "tokenExperience"});
    //         }
    //     } else {
    //         return res.status(404).json({status: false, type: "tokenBlank"});
    //     }
    // }

    // USER TRANSACTION
    UserTransaction(req, res, next) {
        if(req.headers.authorization && req.headers.authorization !== "Empty") {
            if(JWT.verify(req.headers.authorization.split(' ')[1])) {
                let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
                req.condition = {"_id": {"$eq": token}};

                if(role) {
                    if(req.body.Type || req.body.Func) {
                        if(role === "Admin" || role === "Editer") {
                            if(req.body.Type === "Edit") {
                                req.type = "Edit";
                                req.condition = {"_id": {"$eq": req.body.Id}};
                                delete req.body.Type;
                                delete req.body.Id;

                                if(role !== "Admin") { delete req.body.Role; }
                                if(role === "Admin") {
                                    if(req.body.hasOwnProperty("Password")) {
                                        req.body.Password = BCRYPT.hash(req.body.Password);
                                    }
                                } else {
                                    return res.status(405).json({status: false, type: "missing-permission"});
                                }
                                req.user = req.body;
                                next();
                            }

                            if(role === "Admin") {
                                if(req.body.Func === "Delete") {
                                    delete req.body.Func;
                                    req.condition = {"_id": {"$eq": req.body.Id}};
                                    if(req.body.Type === "Virtual") {
                                        req.type = "Edit";
                                        req.user = {"Status": req.body.Status};
                                    }

                                    if(req.body.Type === "Really") {
                                        req.type = "Delete";
                                        req.condition = {"_id": req.body.Id};
                                    }
                                    next();
                                }

                                if(req.body.Type === "Restore") {
                                    req.type = "Restore";
                                    req.condition = {"_id": {"$in": req.body.Tokens}};
                                    req.user = {"Status": true};
                                    next();
                                }

                                if(req.body.Type === "Register") {
                                    delete req.body.Type;
                                    req.type = "Register";
    
                                    userService.exists({"Email": {"$eq": req.body.Email}})
                                    .then((result) => {
                                        if(!result) {
                                            req.body.Password = BCRYPT.hash(req.body.Password);
                                            req.user = req.body;
                                            next();

                                        } else {
                                            return res.status(404).json({status: false, type: "register-already"});
                                        }
                                    })
                                    .catch((err) => {
                                        throw err;
                                    })
                                }
                            } else {
                                return res.status(405).json({status: false, type: "missing-permission"});
                            }
                        } else {
                            return res.status(405).json({status: false, type: "missing-permission"});
                        }
                    } else {
                        let {type, token, limited, id, start, status} = JSON.parse(req.headers.comment);
                        if(type === "limited") {
                            req.type = "limited";
                            req.limited = limited;
                            req.start = start;
                            req.condition = {Status: {"$eq": true}};
                            next();
                        }

                        if(type === "Find") {
                            req.type = "Find";
                            req.condition = "";
                            
                            if(id && status) {
                                req.condition = {"_id": {"$eq": id}, "Status": status};

                            } else if(id) {
                                req.condition = {"_id": {"$eq": id}};

                            } else {
                                req.condition = {"Status": status};
                            }
                            next();
                        }
                    }
                }
            } else {
                return res.status(404).json({status: false, type: "token-expired"});
            }
        } else {
            return res.status(404).json({status: false, type: "token-blank"});
        }
    }
}

module.exports = new Middleware;