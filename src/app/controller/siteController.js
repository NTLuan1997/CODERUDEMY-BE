const userModule = require("../module/userModule");
const userService = require("../services/userService");
class SiteController {

    //[GET]
    home(req, res) {
        res.render("components/site/home", { show: true })
    }

    //[POST]
    login(req, res) {
        let { email, password } = req.body;
        if (email, password) {
            userService.isUser(email, password)
                .then((data) => {
                    let user = {
                        status: true,
                        message: (data) ? "Login successful!!" : "Invalid user",
                        user: (data) ? data : null
                    };
                    res.json(user);
                })
                .catch((err) => {
                    throw err;
                })

        } else {
            res.render("components/site/login", { show: false });
        }
    }

    //[GET]
    search(req, res) {
        res.render("components/site/search");
    }
}

module.exports = new SiteController;