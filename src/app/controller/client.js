const clientService = require("../services/clientService");

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
            .cacth((err) => {
                throw err;
            })
        }

        if(req.type === "Edit") { edit() }

        if(req.type === "Find") { find() }
    }
}

module.exports = new Client;