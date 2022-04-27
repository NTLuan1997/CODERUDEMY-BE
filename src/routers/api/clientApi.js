const router = require('express').Router();
const middleware = require('../../app/middleware/clientMiddleware');
const clientController = require('../../app/controller/clientController');

router.post('/manager-client', middleware.client, clientController.managerClient);

module.exports = router;
