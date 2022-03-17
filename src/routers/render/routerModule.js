const courseRouter = require("./courseRouter");
const newsRouter = require("./newsRouter");
const siteRouter = require("./siteRouter");
const userRouter = require("./usersRouter");

function routerRenderModule(app) {
    app.use("/courses", courseRouter);
    app.use("/news", newsRouter);
    app.use("/users", userRouter);
    app.use("/", siteRouter);
}

module.exports = routerRenderModule;