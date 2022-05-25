const router = require('express').Router();
const authenticate = require('../../app/oauth2/authentication');

router.post("/client", authenticate.local);
router.post("/manager", authenticate.local);

module.exports = router;