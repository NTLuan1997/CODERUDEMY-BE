const router = require('express').Router();
const middleware = require('../../app/middleware/middleware');
const controller = require("../../app/controller/ClientController");

router.get("/client", middleware.ClientTransaction, controller.Functions);
router.post('/client', middleware.ClientTransaction, controller.Functions);
router.put('/client',  middleware.ClientTransaction, controller.Functions);
router.delete('/client', middleware.ClientTransaction, controller.Functions);

module.exports = router;


