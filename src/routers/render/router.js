const Client = require("./client");
const Course = require("./course");
const News = require("./new");
const Site = require("./site");
const User = require("./user");

function router(app) {
    app.use("/clients", Client);
    app.use("/courses", Course);
    app.use("/news", News);
    app.use("/users", User);
    app.use("/", Site);
}

module.exports = router;