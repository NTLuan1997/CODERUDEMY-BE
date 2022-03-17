const courseService = require("../services/courseService");

class CourseController {

    constructor() {
        // courseService.findOneCourse("6229be63fafe1ed7d304048b")
        //     .then((data) => {
        //         console.log(data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
    }

    // Method render template.
    renderCourse(req, res) {
        res.render('components/courses/course', { show: true });
    }

    // Method support api.

}

module.exports = new CourseController;