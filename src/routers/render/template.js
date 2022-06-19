const router = require("express").Router();
const Template = require("../../app/controller/web/template");

// VIEWS
    // COMMON
        router.get("/", Template.render);

    // CLIENT
        router.get("/client/detail", Template.render);
        router.get("/client/recycle", Template.render);
        router.get("/client", Template.render);

    // COURSE
        router.get("/course/detail", Template.render);
        router.get("/course/recycle", Template.render);
        router.get("/course", Template.render);
        
    // LESSON
        router.get("/web/course/unit/lesson/detail", Template.render);
        router.get("/web/course/unit/lesson/recycle", Template.render);
        router.get("/web/course/unit/lesson", Template.render);

    // UNIT
        router.get("/web/course/unit/detail", Template.render);
        router.get("/web/course/unit/recycle", Template.render);
        router.get("/course/unit", Template.render);

    // USER
        router.get("/user/detail", Template.render);
        router.get("/user/recycle", Template.render);
        router.get("/user", Template.render);

module.exports = router;
