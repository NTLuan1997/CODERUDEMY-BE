const ObjectId = require("mongodb").ObjectId;
const usersModule = require("../module/userModule");

class UsersController {

    //[GET]
    index(req, res) {
        let attribute = {
            show: true,
            keys: ["STT", "Tài khoản", "Email", "Password", "Trạng thái", "Chuyên môn", "Tuổi", "Quyền"],
            totalUser: usersModule.findUser().length,
            users: usersModule.findUser()
        };

        res.render("components/users/index", attribute);
    }

    //[GET]
    pageDetail(req, res) {
        let user = usersModule.findUser().find((e) => e._id == req.query.id);
        res.render("components/users/userDetail", { show: true, user: user });
    }

    //[POST]
    createUser(req, res) {
        console.log(req.body);
        usersModule.findUser().forEach((e) => {
            console.log(e?._id);
        })
        // res.send({ action: "Create" });
    }

    //[PUT]
    updateUser(req, res) {
        let user = req.body;
        // let id = new ObjectId(user.id);
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
        res.send({ action: "Delete" });
    }

}

module.exports = new UsersController;