const router = require('express').Router();
const middleware = require('../../app/middleware/middleware');
const controller = require("../../app/controller/client");

router.get("/client", middleware.clientTransaction, controller.functions);
router.post('/client', middleware.clientTransaction, controller.functions);
router.put('/client',  middleware.clientTransaction, controller.functions);
// router.delete('/client', middleware.client, clientController.Functions);

module.exports = router;
