class User {

    constructor() { }

    functions(req, res) {
        console.log("Controller");
        res.status(200).json({status: true});
    }
}

module.exports = new User;