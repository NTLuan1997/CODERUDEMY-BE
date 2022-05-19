const clientService = require("../services/clientService");
const courseService = require("../services/courseService");
const jwt = require("../utils/jwt");
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
        let Courses = [];
        courseService.findCourse()
        .then((courses) => {
            let mapper = courses.reduce((accument, currentValue) => {
                let obj = {"_id": currentValue?._id, "courseName": currentValue?.courseName};
                return accument.concat(obj);
            }, []);
            return mapper;
        })
        .then((courses) => {
            if(courses.length > 0) {
                Courses = courses;
                return clientService.findOneClient(req.findClientById);
            }
        })
        .then((client) => {
            res.status(200).json({"Client": client, "Courses": Courses});
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

    Functions(req, res) {
        res.status(200).json({status: true, message: "Check"});
        // function Save(req, res) {
        //     clientService.new(req.Client)
        //     .then((data) => {
        //         if(data.status) {
        //             return data;

        //         } else {
        //             res.status(405).json({status: false, message: 'Create account failed'});
        //         }
        //     })
        //     .then((data) => {
        //         res.status(200).json({client: data, token: jwt.generation(data.doc._id)});
        //     })
        //     .catch((err) => {
        //         return res.status(405).json({status: err, message: 'Method failed'});
        //     })
        // }

        // function Update(req, res) {
        //     clientService.update(req.Query, req.Client)
        //     .then((data) => {
        //         res.status(200).json(data);
        //     })
        //     .catch((err) => {
        //         return res.status(405).json({status: err, message: 'Method failed'});
        //     })
        // }

        // function Delete(req, res) {
        //     clientService.delete(req.Query)
        //     .then((data) => {
        //         res.status(200).json(data);
        //     })
        //     .catch((err) => {
        //         throw err;
        //     })
        // }

        // if(req.Func === "Edit") {
        //     Update(req, res);
        // }

        // if(req.Func === "Remove") {
        //     Delete(req, res);
        // }

        // if(req.Func === "Register") {
        //     Save(req, res);
        // }
    }
}

module.exports = new ClientController();
