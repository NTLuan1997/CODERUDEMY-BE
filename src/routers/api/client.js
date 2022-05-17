const router = require('express').Router();
const authentication = require("../../app/oauth2/authentication");
const middleware = require('../../app/middleware/clientMiddleware');
const clientController = require('../../app/controller/clientController');

router.get("/client/:id", middleware.client, clientController.Get);
router.post('/client', middleware.client, clientController.Functions);
router.post('/manager-client', clientController.managerClient);
// router.put('/client-courses', middleware.client, clientController.Update);
// router.put('/client-thumbnail', middleware.client, clientController.Update);
router.put('/client',  middleware.client, clientController.Functions);
router.delete('/client', middleware.client, clientController.Functions);

module.exports = router;
