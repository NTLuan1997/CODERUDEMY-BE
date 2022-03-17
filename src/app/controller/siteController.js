const userService = require("../services/userService");
class SiteController {

    //[GET]
    home(req, res) {
        res.render("components/site/home", { show: true })
    }

    //[POST]
    login(req, res) {
        //req.hasOwnProperty("userLogin")
        if (req.userLogin?.email && req.userLogin?.password) {
            userService.isUser(req.userLogin.email, req.userLogin.password)
                .then((data) => {
                    let user = {
                        status: (data) ? true : false,
                        message: (data) ? "Login successful!!" : "User dosen't exist",
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