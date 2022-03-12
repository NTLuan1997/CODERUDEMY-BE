const userApi = require("./userApi");

function routerApiModule(app) {
    app.use("/API/login", userApi);
}

module.exports = routerApiModule;