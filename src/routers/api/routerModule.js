const userApi = require("./userApi");

function routerApiModule(app) {
    app.use("/API/user", userApi);
}

module.exports = routerApiModule;