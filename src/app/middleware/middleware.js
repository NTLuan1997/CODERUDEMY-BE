const JWT = require("../utils/jwt");
const BCRYPT = require("../utils/bcrypt");
const ClientService = require("../services/clientService");
const LessonService = require("../services/lessonService");
const UserService = require("../services/UserService");
const UnitService = require("../services/unitService");
class Middleware {

    constructor() { }

    //CLIENT TRANSACTION
    ClientTransaction(req, res, next) {
        if(req.headers.authorization && req.headers.authorization !== "Empty") {
            if(JWT.verify(req.headers.authorization.split(' ')[1])) {
                let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
                req.condition = {"_id": {"$eq": token}};

                if(role) {
                    if(req.body?.Type || req.body?.Func) {
                        if(req.body?.Type === "modified") {
                            req.type = "Modified";
                            req.condition = {"_id": {"$eq": req.body.Id}};

                            delete req.body.Platform;
                            delete req.body.Id;
                            delete req.body.Type;

                            if(req.body.Password) {
                                req.body.Password = BCRYPT.hash(req.body.Password);
                            }
                            req.client = req.body;
                            next();
                        }

                        if(role === "Admin") {
                            if(req.body.Func === "Delete") {
                                delete req.body.Func;
                                req.condition = {"_id": {"$eq": req.body.Id}};
                                if(req.body.Type === "Virtual") {
                                    req.type = "Modified";
                                    req.client = {"Status": false};
                                }

                                if(req.body.Type === "Really") {
                                    req.type = "Delete";
                                }
                                next();
                            }

                            if(req.body.Type === "Restore") {
                                req.type = "Restore";
                                req.condition = {"_id": {"$in": req.body.Tokens}};
                                req.client = {"Status": true};
                                next();
                            }
                            
                            if(req.body?.Type === "Register") {
                                let condition = {"Email": {"$eq": req.body?.Email}};
                                ClientService.exists(condition)
                                .then((result) => {
                                    if(result?.status) {
                                        return res.status(405).json({status: false, type: "register-already"});

                                    } else {
                                        req.type = "Register";
                                        delete req.body?.Platform;
                                        delete req.body?.Type;
                                        req.body.Password = BCRYPT.hash(req.body.Password);
                                        req.client = req.body;
                                        next();
                                    }
                                })
                            }
                        } else {
                            return res.status(405).json({status: false, type: "missing-permission"});
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

                } else {
                    return res.status(405).json({status: false, type: "missing-role"});
                }
            } else {
                return res.status(404).json({status: false, type: "token-expired"});
            }
        } else {
            return res.status(404).json({status: false, type: "token-blank"});
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

                            if(req.body.Func === "modified") {
                                req.condition = {"_id": {"$eq": req.body.Id}};
                                req.type = "Modified";

                                delete req.body.Func;
                                delete req.body.Id;

                                if(req.body.hasOwnProperty("Status")) {
                                    if(role === "Admin") {
                                        req.course = req.body;
                                        next();

                                    } else {
                                        return res.status(405).json({status: false, type: "missing-permission"});
                                    }
                                } else {
                                    req.course = req.body;
                                    next();
                                }
                            }

                            if(role === "Admin") {
                                if(req.body.Func === "create") {
                                    delete req.body.Func;
                                    req.type = "Create";
                                    req.course = req.body;
                                    next();
                                }

                                if(req.body.Func === "Delete") {
                                    delete req.body.Func;
                                    req.condition = {"_id": {"$eq": req.body.Id}};
                                    if(req.body.Type === "Virtual") {
                                        req.type = "Modified";
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
                            } else {
                                return res.status(405).json({status: false, type: "missing-permission"});
                            }
                        } else {
                            return res.status(405).json({status: false, type: "missing-permission"});
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
                } else {
                    return res.status(405).json({status: false, type: "missing-role"});
                }
            } else {
                return res.status(404).json({status: false, type: "token-expired"});
            }
        } else {
            return res.status(404).json({status: false, type: "token-blank"});
        }
    }

    // UNIT TRANSACTION
    UnitTransactions(req, res, next) {
        if(req.headers.authorization && req.headers.authorization !== "Empty") {
            if(JWT.verify(req.headers.authorization.split(' ')[1])) {
                let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
                req.condition = {"_id": {"$eq": token}};

                if(role) {
                    if(req.body?.Type || req.body?.Func) {
                        if(role === "Admin" || role === "Editer") {
                            if(req.body.Type === "modified") {
                                req.type = "modified";
                                req.condition = {"_id": {"$eq": req.body.Id}};
                                delete req.body.Id;
                                delete req.body.Type;

                                if(req.body.hasOwnProperty("Status")) {
                                    if(role === "Admin") {
                                        req.unit = req.body;
                                        next();
                                    } else {
                                        return res.status(405).json({status: false, type: "missing-permission"});
                                    }
                                } else {
                                    req.unit = req.body;
                                    next();
                                }
                            }

                            if(role === "Admin") {
                                if(req.body.Type === "created") {
                                    delete req.body.Type;
                                    req.type = "created";
                                    req.conditionUnit = {"CourseId": {"$eq": req.body.CourseId}};
                                    req.conditionCourse = {"_id": {"$eq": req.body.CourseId}};
                                    req.unit = req.body;
                                    next();
                                }

                                if(req.body.Func === "Delete") {
                                    delete req.body.Func;
                                    req.condition = {"_id": {"$eq": req.body.Id}};
                                    if(req.body.Type === "Virtual") {
                                        req.type = "modified";
                                        req.unit = {"Status": false};
                                        next();
                                    }

                                    if(req.body.Type === "Really") {
                                        UnitService.find(req.condition)
                                        .then((result) => {
                                            if(result?.length) {
                                                req.type = "remove";
                                                req.conditionUnit = {"CourseId": {"$eq": result[0].CourseId}};
                                                req.conditionCourse = {"_id": {"$eq": result[0].CourseId}};
                                                next();
                                            } else {
                                                console.log("Test");
                                            }
                                        })
                                        .catch((err) => {
                                            throw err;
                                        })
                                    }
                                }

                                if(req.body.Type === "Restore") {
                                    req.type = "restore";
                                    req.condition = {"_id": {"$in": req.body.Tokens}};
                                    req.unit = {"Status": true};
                                    next();
                                }

                            } else {
                                return res.status(405).json({status: false, type: "missing-permission"});
                            }
                        } else {
                            return res.status(405).json({status: false, type: "missing-permission"});
                        }
                    } else {
                        let {type, token, id, limited, start, status} = JSON.parse(req.headers.comment);
                        if(type === "Find") {
                            req.type = "find";
                            req.condition = "";
                            
                            if(id && status) {
                                req.condition = {"CourseId": {"$eq": id}, "Status": status};

                            } else if(id) {
                                req.condition = {"_id": {"$eq": id}};

                            } else {
                                req.condition = {"Status": status};
                            }
                            next();
                        }
                    }

                } else {
                    return res.status(405).json({status: false, type: "missing-role"});
                }
            } else {
                return res.status(404).json({status: false, type: "token-expired"});
            }
        } else {
            return res.status(404).json({status: false, type: "token-blank"});
        }
    }

    // LESSON TRANSACTION
    LessonTransaction(req, res, next) {
        if(req.headers.authorization && req.headers.authorization !== "Empty") {
            if(JWT.verify(req.headers.authorization.split(' ')[1])) {
                let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
                req.condition = {"_id": {"$eq": token}};

                if(role) {
                    if(req.body?.Type || req.body?.Func) {
                        if(role === "Admin" || role === "Editer") {
                            if(req.body.Type === "modified") {
                                req.type = "modified";
                                req.condition = {"_id": {"$eq": req.body.Id}};
                                delete req.body.Id;
                                delete req.body.Type;

                                if(req.body.hasOwnProperty("Status")) {
                                    if(role === "Admin") {
                                        req.lesson = req.body;
                                        next();
                                    } else {
                                        return res.status(405).json({status: false, type: "missing-permission"});
                                    }
                                } else {
                                    req.lesson = req.body;
                                    next();
                                }
                            }

                            if(role === "Admin") {
                                if(req.body.Type === "created") {
                                    delete req.body.Type;
                                    req.type = "created";
                                    req.conditionLesson = {"UnitId": {"$eq": req.body.UnitId}};
                                    req.conditionUnit = {"_id": {"$eq": req.body.UnitId}};
                                    req.lesson = req.body;
                                    next();
                                }

                                if(req.body.Func === "Delete") {
                                    delete req.body.Func;
                                    req.condition = {"_id": {"$eq": req.body.Id}};
                                    if(req.body.Type === "Virtual") {
                                        req.type = "modified";
                                        req.lesson = {"Status": false};
                                        next();
                                    }

                                    if(req.body.Type === "Really") {
                                        LessonService.find(req.condition)
                                        .then((result) => {
                                            if(result?.length) {
                                                req.type = "remove";
                                                req.conditionLesson = {"UnitId": {"$eq": result[0].UnitId}};
                                                req.conditionUnit = {"_id": {"$eq": result[0].UnitId}};
                                                next();

                                            } else {
                                                console.log("Test");
                                            }
                                        })
                                        .catch((err) => {
                                            throw err;
                                        })
                                    }
                                }

                                if(req.body.Type === "Restore") {
                                    req.type = "restore";
                                    req.condition = {"_id": {"$in": req.body.Tokens}};
                                    req.lesson = {"Status": true};
                                    next();
                                }

                            } else {
                                return res.status(405).json({status: false, type: "missing-permission"});
                            }
                        } else {
                            return res.status(405).json({status: false, type: "missing-permission"});
                        }
                    } else {
                        let {type, token, id, limited, start, status} = JSON.parse(req.headers.comment);
                        if(type === "Find") {
                            req.type = "find";
                            req.condition = "";
                            
                            if(id && status) {
                                req.condition = {"UnitId": {"$eq": id}, "Status": status};

                            } else if(id) {
                                req.condition = {"_id": {"$eq": id}};

                            } else {
                                req.condition = {"Status": status};
                            }
                            next();
                        }
                    }

                } else {
                    return res.status(405).json({status: false, type: "missing-role"});
                }
            } else {
                return res.status(404).json({status: false, type: "token-expired"});
            }
        } else {
            return res.status(404).json({status: false, type: "token-blank"});
        }
    }

    // USER TRANSACTION
    UserTransaction(req, res, next) {
        if(req.headers.authorization && req.headers.authorization !== "Empty") {
            if(JWT.verify(req.headers.authorization.split(' ')[1])) {
                let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
                req.condition = {"_id": {"$eq": token}};

                if(role) {
                    if(req.body.Type || req.body.Func) {
                        if(role === "Admin" || role === "Editer") {
                            if(req.body.Type === "modified") {
                                req.type = "Modified";
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
                                console.log(req.body);

                                // req.user = req.body;
                                // next();
                            }

                            if(role === "Admin") {
                                if(req.body.Func === "Delete") {
                                    delete req.body.Func;
                                    req.condition = {"_id": {"$eq": req.body.Id}};
                                    if(req.body.Type === "Virtual") {
                                        req.type = "Modified";
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
    
                                    UserService.exists({"Email": {"$eq": req.body.Email}})
                                    .then((result) => {
                                        if(!result) {
                                            req.body.Password = BCRYPT.hash(req.body.Password);
                                            req.user = req.body;
                                            next();

                                        } else {
                                            return res.status(405).json({status: false, type: "register-already"});
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
