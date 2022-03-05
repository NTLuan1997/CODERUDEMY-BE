const userModule = require("../module/userModule");
class SiteController {

    //[GET]
    home(req, res) {
        res.render("components/site/home", { show: true })
    }

    //[POST]
    login(req, res) {
        let userInfo = req.body;
        if (!!Object.values(userInfo).length) {
            userModule.isUser(userInfo)
                .then((data) => {
                    if (data) {
                        res.status(200).json({ status: true, message: "Login successful!!", data });
                    } else {
                        res.status(200).json({ status: false, message: "Invalid user" });
                    }
                })
                .catch((err) => {
                    console.log(err);
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