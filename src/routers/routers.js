const newsRouter = require("./dispatcher/newsRouter");
const siteRouter = require("./dispatcher/siteRouter");
const userRouter = require("./dispatcher/usersRouter");
const routerModule = require("./dispatcher/api/routerModule");

function router(app) {

    app.use("/news", newsRouter);
    app.use("/users", userRouter);
    app.use("/", siteRouter);
}

module.exports = router;