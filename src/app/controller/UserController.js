const userService = require("../services/userService");
class UserController {

    constructor() { }

    Functions(req, res) {

        function limited() {
            userService.limit(req.condition, req.limited, req.start)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function find() {
            userService.find(req.condition)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function saved() {
            userService.saved(req.user)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function updated() {
            userService.update(req.condition, req.user)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function restore() {
            userService.restore(req.condition, req.user)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        function remove() {
            userService.remove(req.condition)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) =>  {
                throw err;
            })
        }

        if(req.type === "Delete"){remove()}
        if(req.type === "Find"){find()}
        if(req.type === "Restore"){restore()}
        if(req.type === "Register"){saved()}

        if(req.type === "limited"){limited()}
        if((req.type === "Modified")){updated()}
    }
}

module.exports = new UserController;
