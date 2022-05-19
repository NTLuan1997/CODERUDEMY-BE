const jwt = require("jsonwebtoken");
class JWT {
    generation(token) {
        return jwt.sign({"token": token}, "authentication", { algorithm: "HS256", expiresIn: 3600});
    }

    verify(token) {
        return jwt.verify(token, "authentication");
    }

    decoded(token) {
        return jwt.decode(token, {complete: true});
    }
}


module.exports = new JWT;
