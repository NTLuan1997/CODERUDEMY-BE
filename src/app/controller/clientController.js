const clientService = require('../services/clientService');
class ClientController {

    constructor() { }

    // Render page
    renderClient(req, res) {
        res.status(200).render('components/clients/client', {show: true});
    }

    renderDetail(req, res) {
        res.status(200).render('components/clients/clientDetail', {show: true});
    }

    // API
    getCourse(req, res) {
        res.status(200).json({ status: true, "course": req.course });
    }

    Get(req, res) {
        clientService.findOneClient(req.findClientById)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            throw err;
        })
    }

    managerClient(req, res) {
        clientService.findLimitClient(Number(req.body.limit), Number(req.body.start))
        .then((clients) => {
            if(clients[0].length) {
                res.status(200).json({
                    "clients": clients[0],
                    "length": clients[1]
                })

            } else {
                return res.status(200).json({ status: false, message: "Not found data", clinets: {} });
            }
        })
        .catch((err) => {
            return res.status(405).json({status: err, message: 'Method failed'});
        })
    }

    Save(req, res) {
        clientService.newClient(req.Client)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            return res.status(405).json({status: err, message: 'Method failed'});
        })
    }

    Update(req, res) {
        clientService.update(req.Query, req.Client)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            return res.status(405).json({status: err, message: 'Method failed'});
        })
    }

    Delete(req, res) {
        clientService.delete(req.Query)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            throw err;
        })
    }
}

module.exports = new ClientController();
