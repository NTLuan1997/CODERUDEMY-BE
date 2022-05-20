const router = require('express').Router();
const authentication = require("../../app/oauth2/authentication");
const middleware = require('../../app/middleware/middleware');
// const clientController = require('../../app/controller/clientController');
const controller = require("../../app/controller/client");

// router.get("/client/:id", middleware.client, clientController.Get);
router.get("/client", middleware.client, controller.functions);
router.post('/client', middleware.client, controller.functions);
// router.post('/manager-client', clientController.managerClient);
// router.put('/client-courses', middleware.client, clientController.Update);
// router.put('/client-thumbnail', middleware.client, clientController.Update);
router.put('/client',  middleware.client, controller.functions);
// router.delete('/client', middleware.client, clientController.Functions);

module.exports = router;
