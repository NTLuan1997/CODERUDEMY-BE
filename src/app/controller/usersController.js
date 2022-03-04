const ObjectId = require("mongodb").ObjectId;
const usersModule = require("../module/userModule");

class UsersController {

    //[GET]
    index(req, res) {
        let attribute = {
            show: true,
            keys: ["STT", "Tài khoản", "Email", "Password", "Trạng thái", "Chuyên môn", "Tuổi", "Quyền"],
            users: null
        };

        usersModule.findUser()
            .then((data) => {
                attribute.users = data;
                res.render("components/users/index", attribute);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //[GET]
    pageDetail(req, res) {
        // let user = usersModule.findUser().find((e) => e._id == req.query.id);
        // res.render("components/users/userDetail", { show: true, user: user });
        // usersModule.findUser()
        // .then((data) => {
        //     if(data) {
        //         let users = {};
        //         Object.assign(users, data);
        //         res.render("components/users/userDetail", { show: true, user: users });
        //     }
        // })
        // .catch((err) => {
        //     console.log(err);
        // })
        if (req.query.id) {


        } else {
            res.render("components/users/userDetail", { show: true });
        }
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

        usersModule.createUser(data);
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
        usersModule.updateUser(query, body);
        res.send({ action: "Update" });
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