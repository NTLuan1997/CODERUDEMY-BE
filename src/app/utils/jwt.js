const jwt = require("jsonwebtoken");

function generation(userId) {
    return jwt.sign({ "_id": userId }, "authentication", { algorithm: "HS256", expiresIn: 3600 });
}

function verify(token) {
    return jwt.verify(token, "authentication");
}


module.exports = { generation, verify };
