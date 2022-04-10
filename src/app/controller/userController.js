const userService = require("../services/userService");
const jwt = require("../utils/jwt");

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

    signOut(req, res) {
        if (req.serverToken) {
            res.status(200).clearCookie(req.serverToken).json({ status: true });
        }

        if (req.clientToken) {
            res.status(200).clearCookie(req.clientToken).json({ status: true });
        }
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

    // CLIENT
    register(req, res) {
        let query = { "email": { "$eq": req.body.email } };
        userService.isUser(query)
            .then((data) => {
                if (data) {
                    res.status(405).json({ "status": false, message: "Email đã được đăng ký" });
                    return { status: false };
                } else {
                    return userService.newUser(req.clientBody);
                }
            })
            .then((data) => {
                if (data.status) {
                    console.log(data.user);
                    res.status(200).json({ "status": true, message: "Email đã được kích hoạt", token: jwt.generation(data.user["_id"]) });

                } else {
                    res.status(405).json({ "status": false, message: "Đăng ký không thành công" });
                }
            })
            .catch((err) => {
                throw err;
            })
    }

    signIn(req, res) {
        res.status(200).json({ "status": true, message: "Email đã được kích hoạt", token: req.clientToken });
    }

}

module.exports = new UserController;