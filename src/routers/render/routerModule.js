const newsRouter = require("./newsRouter");
const siteRouter = require("./siteRouter");
const userRouter = require("./usersRouter");
const user = require("../../app/middleware/userMiddleware");

function routerRenderModule(app) {
    app.use("/news", newsRouter);
    app.use("/users", userRouter);
    app.use("/", siteRouter);
}

module.exports = routerRenderModule;