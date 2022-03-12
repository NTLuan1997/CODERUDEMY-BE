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
                        status: (data.length > 0) ? true : false,
                        message: (data.length > 0) ? "Login successful!!" : "User dosen't exist",
                        user: (data.length > 0) ? data : null
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