const userApi = require("./userApi");

function routerApiModule(app) {
    app.use("/API", userApi);
}

module.exports = routerApiModule;