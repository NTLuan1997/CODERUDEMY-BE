const clientService = require("../services/clientService");

class Client {
    service = clientService;

    constructor() { }

    functions(req, res) {
        function find() {
            res.status(200).json({status: true});
        }

        function edit() {
            this.service.update(req.condition, req.client)
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