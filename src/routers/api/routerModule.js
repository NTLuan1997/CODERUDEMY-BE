const courseApi = require("./courseApi");
const userApi = require("./userApi");

function routerApiModule(app) {
    app.use("/API/course", courseApi);
    app.use("/API/user", userApi);
}

module.exports = routerApiModule;