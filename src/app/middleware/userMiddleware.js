let plag = "";
let count = 0;
let recount = 0;

function accept(req, res, next) {
    console.log(req.session);

    if (count == 0) {
        plag = req.originalUrl;
        if (plag != "/" && req.session.hasOwnProperty("user")) {
            return next();
        }
        ++count;
    }

}

module.exports = { accept };