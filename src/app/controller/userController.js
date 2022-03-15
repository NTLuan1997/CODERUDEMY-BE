const ObjectId = require("mongodb").ObjectId;
// const usersModule = require("../module/userModule");
const userService = require("../services/userService");

class UserController {

    constructor() { }

    index(req, res) {
        res.render("components/users/index", { show: true });
    }

    pageUser(req, res) {
        let { limit, start } = req.query;
        userService.findLimit(Number.parseInt(limit), Number.parseInt(start))
            .then((data) => {
                res.status(200).json({
                    "users": data[0],
                    "length": data[1]
                })
            })
            .catch((err) => {
                throw err;
            })
    }

    pageDetail(req, res) {
        let Id = req.query.id;
        if (Id) {
            userService.findUserSingle(Id)
                .then((data) => {
                    res.render("components/users/userDetail", { show: true, user: data.toObject() });
                })
                .catch((err) => {
                    throw err;
                })

        } else {
            res.render("components/users/userDetail", { show: true });
        }
    }

    newUser(req, res) {
        userService.newUseSingle(req.mongoBody)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.json({ status: false, message: err });
            })
    }

    editUser(req, res) {
        userService.updateUserSingle(req.mongoQuery, req.mongoBody)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.json({ status: false, message: err });
            })
    }

    removeUser(req, res) {
        userService.deleteUserSingle(req.mongoQuery)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.json({ status: false, message: err });
            })
    }

}

module.exports = new UserController;