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
                    if (user.status) {
                        req.session.user = user;
                        req.session.user.expires = 24 * 60 * 60 * 1000;
                        req.session.user.maxAge = 24 * 60 * 60 * 1000;
                        req.session.user.originalMaxAge = 24 * 60 * 60 * 1000;
                        // req.session.destroy();
                    }
                    console.log(user);
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