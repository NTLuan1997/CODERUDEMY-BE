const Template = require("./template");

function router(app) {
    app.use("/web", Template);
    app.use("/", Template);
}

module.exports = router;