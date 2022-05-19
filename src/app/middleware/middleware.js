const Client = require("./client");

class Middleware {

    constructor() { }

    client(req, res, next) {
        if(req.body.Type === "Edit") {
            delete req.body.Type;
            Client.edit(req.body, req, res, next);
        }

        if(req.body.Type === "Find") {
            delete req.body.Type;
            Client.find(req.body, req, res, next);
        }
    }
}

module.exports = new Middleware;