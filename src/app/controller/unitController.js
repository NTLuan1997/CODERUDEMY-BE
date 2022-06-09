class UnitController {

    constructor() { }

    Functions(req, res) {
        
        function find() {
            res.status(200).json({status: true});
        }
        
        if(req.type === "Find") {find()}
    }

}

module.exports = new UnitController;