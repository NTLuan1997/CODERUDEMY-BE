const clientApi = require('./clientApi');
const courseApi = require("./courseApi");
const userApi = require("./userApi");

function routerApiModule(app) {
    app.use("/API/client", clientApi);
    app.use("/API/course", courseApi);
    app.use("/API/unit", courseApi);
    app.use("/API/lesson", courseApi);
    app.use("/API/user", userApi);
}

module.exports = routerApiModule;