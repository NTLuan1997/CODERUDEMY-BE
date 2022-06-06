const passport = require('passport');
const localStrategy = require("passport-local").Strategy;
const Bcrypt = require("../utils/bcrypt");
const JWT = require("../utils/jwt");
const clientService = require("../services/clientService");
const userService = require("../services/userService");

passport.use(new localStrategy({
    usernameField: "Email",
    passwordField: "Password",
    passReqToCallback: true
}, verify));

function verify(req, Email, Password, done) {
    let query = {"Email": {"$eq": Email}};

    if(req.body.Type === "Client") {
        client(query, Password, done);
    }

    if(req.body.Type === "Manager") {
        manager(query, Password, done);
    }
}

function client(query, Password, done) {
        clientService.exists(query)
        .then((result) => {
            if(result?.status) {
                return result;
            } else {
                done({status: false, type: "accountUnregister"});
            }
        })
        .then((doc) => {
            let condtion = {"_id": {"$eq": doc.client}};
            return clientService.find(condtion);
        })
        .then((result) => {
            if(result.length) {
                if(Bcrypt.compare(Password, result[0].Password)) {
                    done(null, {token: JWT.generation(result[0]._id)});
                } else {
                    done({status: false, type:"passwordIncorrect"});
                }
            }
        })
        .catch((err) => {
            done(err);
        })
}

function manager(query, Password, done) {
    userService.exists(query)
    .then((result) => {
        if(result?.status) {
            return result;

        } else {
            done({status: false, type: "accountUnregister"});
        }
    })
    .then((doc) => {
        let condition = {"_id": {"$eq": doc?.user}};
        return userService.find(condition);

    })
    .then((result) => {
        let objResult = result[0].toObject();
        // console.log(Bcrypt.compare(Password, objResult.Password));
        // if(Password === objResult.Password) {
        //     done(null, {token: JWT.roleEncode(objResult._id, objResult.Role)});
        // }

        if(Bcrypt.compare(Password, objResult.Password)) {
            done(null, {token: JWT.roleEncode(objResult._id, objResult.Role)});

        } else {
            done({status: false, type:"passwordIncorrect"});
        }
    })
    .catch((err) => {
        throw err;
    })
}

passport.serializeUser((result, done) => { });
passport.deserializeUser((result, done) => { });


class Authentication {

    constructor() { }

    init(app) {
        app.use(passport.initialize());
        app.use(passport.session());
    }

    local(req, res, next) {
        passport.authenticate("local", function(err, token) {
            if(err) return res.status(405).json(err);
            res.status(200).json(token);
            
        })(req, res, next);
        
    }

}

module.exports = new Authentication;