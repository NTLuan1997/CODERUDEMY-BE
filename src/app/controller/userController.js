const ObjectId = require("mongodb").ObjectId;
const usersModule = require("../module/userModule");
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


    createUser(req, res) {
        let body = req.body;
        let data = {
            "user_name": body["user_name"],
            email: body.email,
            password: body.password,
            age: body.age,
            status: body.status,
            skill: body.skills
        }

        usersModule.createUser(data)
            .then((data) => {
                if (data.status) {
                    res.status(200).json(data);
                }
            })
            .catch((err) => {
                res.status(400).json(err);
            })
    }

    newUser(req, res) {
        let user = req.body;
        let body = {
            "user_name": user["user_name"],
            "password": user.password,
            "email": user.email,
            "status": user.status,
            "skills": user.skills,
            "age": user.age
        };

        userService.newUseSingle(body)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.json({ status: false, message: err });
            })
    }

    editUser(req, res) {
        let user = req.body;
        let query = { _id: new ObjectId(user.id) };
        let body = {
            $set: {
                "user_name": user["user_name"],
                "password": user.password,
                "email": user.email,
                "status": user.status,
                "skills": user.skills,
                "age": user.age
            }
        };

        userService.updateUserSingle(query, body)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.json({ status: false, message: err });
            })
    }



    removeUser(req, res) {
        // let user = req.body;
        // console.log(user);

        let query = { _id: new ObjectId(req.body.id) };
        userService.deleteUserSingle(query)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.json({ status: false, message: err });
            })

        // usersModule.deleteUser(query)
        //     .then((data) => {
        //         if (data.status) {
        //             res.status(200).json({ status: true, message: "delete successfuly" });
        //         }
        //     })
        //     .catch((err) => {
        //         res.json({ status: false, error: err, message: "update failed" });
        //     })
    }

}

module.exports = new UserController;