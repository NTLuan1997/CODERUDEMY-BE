const passport = require('passport');
const localStrategy = require("passport-local").Strategy;
const clientService = require("../services/clientService");

class Authentication {

    constructor() {
        passport.use(new localStrategy({
            usernameField: "Email",
            passwordField: "Password"
        },
            function(Email, Password, done) {
                let query = {"Email": {"$eq": Email}, "Password": {"$eq": Password}};
                clientService.exists(query)
                .then((client) => {
                    console.log(client);
                })
                .catch((err) => {
                    console.Console(err);
                })
            }
        ));
    }

    local(req, res, next) {
        passport.authenticate("local", function(err, data) {
            // if(err) return err;
            // console.log(err);
            // req.Test = "Test";
            // console.log(data);

        })(req, res, next);
    }

}

module.exports = new Authentication;