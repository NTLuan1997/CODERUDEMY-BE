let plag = "";
let count = 0;
let recount = 0;

function accept(req, res, next) {
    if (count == 0) {
        plag = req.path;
        if (plag != "/" && req.session.hasOwnProperty("user")) {
            return next();
        }
        ++count;
    }
}

module.exports = { accept };