function corsOption(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200/", "https://coderudemy.herokuapp.com/");
    res.header("Access-Control-Allow-Methods", "POST", "GET", "OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

module.exports = { corsOption };