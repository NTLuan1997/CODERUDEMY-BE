const userService = require("../services/userService");
const jwt = require("../utils/jwt");
class SiteController {

    //[GET]
    home(req, res) {
        res.render("components/site/home", { show: true })
    }

    //[POST]
    login(req, res) {
        if (req.body.email && req.body.password) {
            let query = { email: { $eq: req.body.email }, password: { $eq: req.body.password } };
            userService.isUser(query)
                .then((user) => {
                    if (user) {
                        res.status(200).json({ status: true, token: jwt.generation(user["_id"]) });

                    } else {
                        res.status(400).json({ status: false, type: "no-found", message: "User not found" });
                    }
                })
                .catch((err) => {
                    throw err;
                })
        } else {
            res.render("components/site/login", { show: false });
        }
    }
}

module.exports = new SiteController;