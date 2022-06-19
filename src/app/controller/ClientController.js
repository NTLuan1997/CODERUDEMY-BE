const ClientService = require("../services/ClientService");
class ClientController {

    constructor() { }

    Functions(req, res) {
        function limited() {
            ClientService.limited(req.condition, req.limited, req.start)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function saved() {
            ClientService.saved(req.client)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        if(req.type === "Limited"){limited()}
        if(req.type === "Register"){saved()}
    }
}

module.exports = new ClientController;