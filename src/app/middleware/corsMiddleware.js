let origins = ["http://localhost:4200", "https://coderudemy.herokuapp.com"];

function corsOption(req, res, next) {
    if (origins.includes(req.headers.origin)) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, UPDATE, PUT, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Comment");
    next();
}

module.exports = { corsOption };