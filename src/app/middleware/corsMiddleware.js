let whiteList = ["http://localhost:4200", "https://coderudemy.herokuapp.com"];

function corsOption(req, res, next) {
    if (whiteList.includes(req.headers.origin)) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

module.exports = { corsOption };