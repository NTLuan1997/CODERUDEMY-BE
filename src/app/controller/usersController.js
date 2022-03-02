const usersModule = require("../module/userModule");

class UsersController {

    //[GET]
    index(req, res) {
        let attribute = {
            show: true,
            keys: ["STT", "User name", "Email", "Password", "Status", "Skill", "Age", "Action"],
            users: usersModule.findUser()
        };
        res.render("components/users/index", attribute);
    }

    //[GET]
    pageDetail(req, res) {
        console.log(req.query.id);
        let user = usersModule.findUser().find((e) => e._id == req.query.id);
        res.render("components/users/userDetail", { show: true, user: user });
    }

}

module.exports = new UsersController;