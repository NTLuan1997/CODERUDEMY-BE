const jwt = require("jsonwebtoken");

function generation(token) {
    return jwt.sign({ "_id": token }, "authentication", { algorithm: "HS256", expiresIn: 3600 });
}

function verify(token) {
    return jwt.verify(token, "authentication");
}

class JWT {
    
}


module.exports = { generation, verify };
