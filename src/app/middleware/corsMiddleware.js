function corsOption(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200", "https://coderudemy.herokuapp.com");
    res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

module.exports = { corsOption };