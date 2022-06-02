const userService = require("../services/userService");
class User {

    constructor() { }

    functions(req, res) {

        function limited() {
            userService.limit(req.limited, req.start)
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

        function update() {
            userService.update(req.condition, req.user)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                throw err;
            })
        }

        if(req.type === "Edit") { update() }
        if(req.type === "limited") { limited() }
        if(req.type === "Find") { find() }
        if(req.type === "Register") { saved() }
    }
}

module.exports = new User;