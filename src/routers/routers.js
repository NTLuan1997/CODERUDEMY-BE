const newsRouter = require("./dispatcher/newsRouter");
const siteRouter = require("./dispatcher/siteRouter");

function router(app) {

    app.use("/news", newsRouter);
    app.use("/", siteRouter);
}

module.exports = router;