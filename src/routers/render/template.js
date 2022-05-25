const router = require("express").Router();
const Template = require("../../app/controller/web/template");

// VIEWS
    // COMMON
    router.get("/", Template.render);

    // CLIENT
    router.get("/client/detail", Template.render);
    router.get("/client", Template.render);

    // COURSE
    router.get("/course/detail", Template.render);
    router.get("/course", Template.render);
    // USER

module.exports = router;
