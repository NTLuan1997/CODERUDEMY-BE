class SiteController {

    //[GET]
    home(req, res) {
        res.render("components/site/home")
    }

    //[GET]
    search(req, res) {
        res.render("components/site/search")
    }
}

module.exports = new SiteController;