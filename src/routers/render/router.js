// const Course = require("./course");
const News = require("./new");
const User = require("./user");
const Template = require("./template");

function router(app) {
    // app.use("/courses", Course);
    app.use("/news", News);
    app.use("/users", User);
    app.use("/web", Template);
    app.use("/", Template);
}

module.exports = router;