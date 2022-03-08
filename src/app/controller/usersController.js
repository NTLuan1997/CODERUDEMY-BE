const ObjectId = require("mongodb").ObjectId;
const usersModule = require("../module/userModule");

class UsersController {

    // [GET]
    index(req, res) {
        res.render("components/users/index", { show: true });
    }

    // [GET HOME]
    pageUser(req, res) {
        let body = req.query;
        usersModule.findLimit(Number.parseInt(body.limit), Number.parseInt(body.start))
            .then((data) => {
                if (data) {
                    res.status(200).json({
                        users: data[0],
                        length: data[1]
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // [GET]
    pageDetail(req, res) {
        let Id = req.query.id;
        if (Id) {
            let query = { "_id": new ObjectId(Id) };
            usersModule.findOneUser(query)
                .then((data) => {
                    if (data) {
                        res.render("components/users/userDetail", { show: true, user: data });
                    }
                })
                .catch((err) => {
                    console.log(err);
                })

        } else {
            res.render("components/users/userDetail", { show: true });
        }
    }

    // [GET pagination]
    pagination(req, res) {
        console.log(req.query.currentPage);
        // res.status(200).json({ status: true, message: "Test" });
    }

    //[POST]
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

    //[PUT]
    updateUser(req, res) {
        let user = req.body;
        let query = { _id: new ObjectId(user.id) };
        let body = {
            $set: {
                "user_name": user["user_name"],
                "password": user.password,
                "email": user.email,
                "status": user.status,
                "skill": user.skills,
                "age": user.age
            }
        };

        usersModule.updateUser(query, body)
            .then((data) => {
                if (data.status) {
                    res.status(200).json(data);
                }
            })
            .catch((err) => {
                res.json({ status: false, message: err });
            })
    }

    //[DELETE]
    deleteUser(req, res) {
        let user = req.body;
        let query = { _id: new ObjectId(user.id) };
        usersModule.deleteUser(query)
            .then((data) => {
                if (data.status) {
                    res.status(200).json({ status: true, message: "delete successfuly" });
                }
            })
            .catch((err) => {
                res.json({ status: false, error: err, message: "update failed" });
            })
    }

}

module.exports = new UsersController;