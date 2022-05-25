class Template {

    constructor() { }

    render(req, res) {
        switch(req._parsedOriginalUrl.pathname) {
            case"/web":
                res.render("components/web", { show: true });
                break;

            case "/web/client":
                res.status(200).render('components/client-component/main', {show: true});
                break;

            case "/web/client/detail":
                res.status(200).render('components/client-component/detail', {show: true});
                break;

            case"/":
            default:
                res.render("components/users/user-signin-component", { show: false });
                break;
        }
    }
}

module.exports = new Template;