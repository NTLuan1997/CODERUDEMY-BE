class ClientController {

    constructor() { }

    getCourse(req, res) {
        res.status(200).json({status: true, "course": req.course});
    }
}

module.exports = new ClientController();
