const jwt = require("../utils/jwt");

function authentication(req, res, next) {
    if (req.cookies?.token) {
        try {
            jwt.verify(req.cookies?.token);
            next();

        } catch (err) {
            return res.redirect('/');
        }
    } else {
        return res.redirect('/');
    }
}

module.exports = { authentication };
