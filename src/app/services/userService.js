const ObjectId = require("mongodb").ObjectId;
const connection = require("../connection/connection");
const Users = require("../module/users");

class UserService {

    constructor() { }

    countUser() {
        return new Promise((resolve, reject) => {
            connection.reConnect()
                .then(() => {
                    resolve(Users.count({}));
                })
                .catch((err) => {
                    throw err;
                })
        })
    }

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

    findUserLimit(limit, start) {
        return new Promise((resolve, reject) => {
            connection.reConnect()
                .then(() => {
                    Users.find({}).limit(limit).skip(start).exec((err, doc) => {
                        if (err) reject(err);
                        resolve(doc);
                    })
                })
                .catch((err) => {
                    throw err;
                })
        })
    }

    findUserSingle(id) {
        return new Promise((resolve, reject) => {
            connection.reConnect()
                .then(() => {
                    Users.findOne({ "_id": { $eq: new ObjectId(id) } }).exec((err, doc) => {
                        if (err) reject(err);
                        resolve(doc);
                    })
                })
                .catch((err) => {
                    throw err;
                })
        })
    }

    findLimit(limit, start) {
        return Promise.all([this.findUserLimit(limit, start), this.countUser()]);
    }

    newUseSingle(body) {
        return new Promise((resolve, reject) => {
            connection.reConnect()
                .then(() => {
                    let user = new Users(body);
                    user.save((err) => {
                        if (err) reject(err);
                        resolve({ status: true, message: "Create done" });
                    })

                })
                .catch((err) => {
                    throw err;
                })
        })
    }

    updateUserSingle(query, body) {
        return new Promise((resolve, reject) => {
            connection.reConnect()
                .then(() => {
                    Users.updateOne(query, body, { upsert: true }).exec((err, doc) => {
                        if (err) reject(err);
                        resolve({ status: true, message: "Update done" });
                    })
                })
                .catch((err) => {
                    throw err;
                })
        })
    }

    deleteUserSingle(query) {
        return new Promise((resolve, reject) => {
            connection.reConnect()
                .then(() => {
                    Users.deleteOne(query).exec((err, doc) => {
                        if (err) reject(err);
                        resolve({ status: true, message: "Update done" });
                    })
                })
                .catch((err) => {
                    throw err;
                })
        })
    }

}

module.exports = new UserService;