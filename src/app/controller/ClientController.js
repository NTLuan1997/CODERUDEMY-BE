const ClientService = require("../services/ClientService");
class ClientController {

    constructor() { }

    Functions(req, res) {
        function find() {
            ClientService.find(req.condition)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function limited() {
            ClientService.limited(req.condition, req.limited, req.start)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function modified() {
            ClientService.update(req.condition, req.client)
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

        function restore() {
            ClientService.restore(req.condition, req.client)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function remove() {
            ClientService.delete(req.condition)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        if(req.type === "Delete"){remove()}
        if(req.type === "Find"){find()}
        if(req.type === "Limited"){limited()}
        if(req.type === "Modified"){modified()}
        if(req.type === "Restore"){restore()}
        if(req.type === "Register"){saved()}
    }
}

module.exports = new ClientController;