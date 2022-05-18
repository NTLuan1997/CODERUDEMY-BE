const Authen = require("./authen");
const Client = require('./client');
const Course = require("./course");
const User = require("./user");

function router(app) {
    app.use("/API/authen", Authen);
    app.use("/API/client", Client);
    app.use("/API/course", Course);
    app.use("/API/unit", Course);
    app.use("/API/lesson", Course);
    app.use("/API/user", User);
}

module.exports = router;