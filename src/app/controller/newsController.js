class NewsController {


    // [GET]/ News
    index(req, res) {
        res.render("components/news/index");
    }

    // [GET]/ news/:slug
    detail(req, res) {
        res.render("components/news/detail");
    }
}

module.exports = new NewsController;