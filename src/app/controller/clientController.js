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

    saveClient(req, res) {
        
    }
}

module.exports = new ClientController();
