const userModule = require("../module/userModule");
class SiteController {

    //[GET]
    home(req, res) {
        res.render("components/site/home", { show: true })
    }

    //[POST]
    login(req, res) {
        if (!!Object.values(req.body).length) {
            let { email, password } = req.body;
            userModule.isUser(email, password);
            res.render("components/site/home", { show: true });

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