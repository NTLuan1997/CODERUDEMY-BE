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

            case "/web/client/detail":
                res.status(200).render('components/client-component/client-detail-component', {show: true});
                break;

            case "/web/course":
                res.status(200).render('components/course-component/course-component', {show: true});
                break;

            case "/web/course/detail":
                break;

            case"/":
            default:
                res.render("components/users/user-signin-component", { show: false });
                break;
        }
    }
}

module.exports = new Template;