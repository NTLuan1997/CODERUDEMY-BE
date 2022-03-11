const connection = require("../connection/connection");
const Users = require("../module/users");

class UserService {

    constructor() { }

    isUser(email, password) {
        return new Promise((resolve, rejetc) => {
            connection.reConnect()
                .then(() => {
                    Users.find({ email: { $eq: email }, password: { $eq: password } }, (err, doc) => {
                        if (err) reject(err);
                        resolve(doc);
                    })
                })
                .catch((err) => {
                    throw err;
                })
        })
    }
}

module.exports = new UserService;