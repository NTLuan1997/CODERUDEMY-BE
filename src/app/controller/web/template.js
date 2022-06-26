class Template {

    constructor() { }

    render(req, res) {
        switch(req._parsedOriginalUrl.pathname) {

            case"/web":
                res.render("components/web-component", { show: true });
                break;

            case "/web/client":
                res.status(200).render('components/client-component/client-component', {show: true});
                break;

            case "/web/client/register":
                res.status(200).render('components/client-component/client-register-component', {show: true});
                break;

            case "/web/client/detail":
                res.status(200).render('components/client-component/client-detail-component', {show: true});
                break;

            case "/web/course":
                res.status(200).render('components/course-component/course-component', {show: true});
                break;

            case "/web/course/detail":
                res.status(200).render('components/course-component/course-detail-component', {show: true});
                break;

            case "/web/course/unit":
                res.status(200).render('components/course-component/unit-component/unit-component', {show: true});
                break;

            case "/web/course/unit/detail":
                res.status(200).render('components/course-component/unit-component/unit-detail-component', {show: true});
                break;

            case "/web/course/unit/lesson":
                res.status(200).render('components/course-component/lesson-component/lesson-component', {show: true});
                break;

            case "/web/course/unit/lesson/detail":
                res.status(200).render('components/course-component/lesson-component/lesson-detail-component', {show: true});
                break;

            case "/web/user":
                res.status(200).render("components/user-component/user-component", {show: true});
                break;

            case "/web/user/detail":
                res.status(200).render("components/user-component/user-detail-component", {show: true});
                break;

            case "/web/information":
                res.status(200).render("components/user-component/user-information-component", {show: true});
                break;

            case "/web/client/recycle":
            case "/web/course/unit/lesson/recycle":
            case "/web/course/unit/recycle":
            case "/web/course/recycle":
            case "/web/user/recycle":
                res.status(200).render("components/common-component/recycle-component", {show: true});
                break;

            case"/":
            default:
                res.render("components/user-component/user-signin-component", { show: false });
                break;
        }
    }
}

module.exports = new Template;