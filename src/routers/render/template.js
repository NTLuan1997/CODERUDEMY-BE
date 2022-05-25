const router = require("express").Router();
const Template = require("../../app/controller/web/template");

// COMMON ROUTER.
router.get("/", Template.render);
router.get("/client/detail", Template.render);
router.get("/client", Template.render);

module.exports = router;
