const clientService = require("../services/clientService");
const JWT = require("../utils/jwt");

class Client {
    constructor() { }

    functions(req, res) {

        function find() {
            clientService.find(req.condition)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function edit() {
            clientService.update(req.condition, req.client)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function save() {
            clientService.save(req.client)
            .then((result) => {
                res.status(200).json({status: true, token: JWT.generation(result.doc._id)});
            })
            .catch((err) => {
                throw err;
            })
        }

        if(req.type === "Edit") { edit() }

        if(req.type === "Find") { find() }

        if(req.type === "Register") { save() }
    }
}

module.exports = new Client;