const jwt = require("jsonwebtoken");
class JWT {

    constructor() { }

    generation(token) {
        return jwt.sign({"token": token}, "authentication", { algorithm: "HS256", expiresIn: ((60*60) * 24)});
    }

    roleEncode(token, role) {
        return jwt.sign({"token": token, "role": role}, "authentication", { algorithm: "HS256", expiresIn: ((60*60) * 24)});
    }

    verify(token) {
        return jwt.verify(token, "authentication");
    }

    decoded(token) {
        return jwt.decode(token, {complete: true});
    }

    destroy(token) {
        jwt.destroy(token, {complete: true});
    }
}


module.exports = new JWT;
