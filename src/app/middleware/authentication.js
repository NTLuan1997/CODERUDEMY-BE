const ObjectId = require("mongodb").ObjectId;
const userService = require("../services/userService");
const jwt = require("../utils/jwt");

function authentication(req, res, next) {
    if (req.cookies?.token) {
        try {
            jwt.verify(req.cookies?.token);
            next();

        } catch (err) {
            return res.redirect('/');
        }
    } else {
        return res.redirect('/');
    }
}

function permissions(req, res, next) {
    let user = jwt.verify(req.cookies?.token);
    let query = { "_id": { "$eq": new ObjectId(user["_id"]) } };
    userService.findSingleUser(query)
        .then((user) => {
            if (user.role != "admin") {
                return res.status(405).json({ status: false, message: "You don't have permissions" });
            } else {
                next();
            }
        })
        .catch((err) => {
            throw err;
        })
}

module.exports = { authentication, permissions };
