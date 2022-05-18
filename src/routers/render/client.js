const router = require('express').Router();
const clientController = require('../../app/controller/clientController');

router.get('/detail', clientController.renderDetail);
router.get('/', clientController.renderClient);

module.exports = router;