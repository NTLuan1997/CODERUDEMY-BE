const ObjectId = require("mongodb").ObjectId;
const passport = require('passport');
const localStrategy = require("passport-local").Strategy;
const Bcrypt = require("../utils/bcrypt");
const clientService = require("../services/clientService");

passport.use(new localStrategy({
    usernameField: "Email",
    passwordField: "Password"
}, verify));

function verify(Email, Password, done) {
    let query = {"Email": {"$eq": Email}};
        clientService.exists(query)
        .then((result) => {
            if(result?.status) {
                return result.doc;
            }
        })
        .then((doc) => {
            let find = {"_id": {"$eq": doc._id}};
            return clientService.find(find);
        })
        .then((result) => {
            if(result.length) {
                result = result[0];
                if(Bcrypt.compare(Password, result.Password)) {
                    done(null, result);
                }
            }
        })
        .catch((err) => {
            done(err);
        })
}

class Authentication {

    constructor() { }

    local(req, res, next) {
        passport.authenticate("local", function(err, data) {
            if(err) return res.status(405).json({status: false, message: "Method passport failed"});

        })(req, res, next);
    }

}

module.exports = new Authentication;