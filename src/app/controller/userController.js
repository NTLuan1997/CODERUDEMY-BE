const userService = require("../services/userService");

class UserController {

    constructor() { }

    // RENDER TEMPLATE
    index(req, res) {
        res.render("components/users/user", { show: true });
    }

    pageDetail(req, res) {
        res.render("components/users/userDetail", { show: true });
    }

    // API

    signout(req, res) {
        res.status(200).clearCookie("token").json({ status: true });
    }

    pageUser(req, res) {
        let { limit, start } = req.query;
        userService.findLimitUser(Number.parseInt(limit), Number.parseInt(start))
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

    findSingleUser(req, res) {
        userService.findSingleUser(req.userQuery)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.json({ status: false, message: err });
            })
    }

    newUser(req, res) {
        userService.newUser(req.mongoBody)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.json({ status: false, message: err });
            })
    }

    editUser(req, res) {
        userService.updateUser(req.mongoQuery, req.mongoBody)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.json({ status: false, message: err });
            })
    }

    removeUser(req, res) {
        userService.deleteUser(req.mongoQuery)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.json({ status: false, message: err });
            })
    }

}

module.exports = new UserController;