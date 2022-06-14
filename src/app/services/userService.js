const ObjectId = require("mongodb").ObjectId;
const User = require("../module/user");
const Service = require("./service");

class UserService extends Service {

    constructor() {
        super();
    }

    // countUser() {
    //     return super.documentQuery((resolve, reject) => {
    //         resolve(User.count({}));
    //     })
    // }

    exists(condition) {
        return super.documentQuery((resolve, reject) => {
            User.exists(condition, (err, doc) => {
                if(err) reject(err);
                let user = doc;
                if(doc) {
                    user = { "status": (doc?._id)? true : false, user: doc._id };
                }
                resolve(user);
            })
        })
    }

    find(condition) {
        let query = (condition)? condition : {};
        return super.documentQuery((resolve, reject) => {
            User.find(query).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        })
    }

    limit(condition, limit, start) {
        let query = (condition)? condition : {};
        return super.documentQuery((resolve, reject) => {
            User.find(query).limit(limit).skip(start).exec((err, doc) => {
                if(err) reject(err);
                resolve(doc);
            })
        })
    }

    saved(body) {
        return super.documentQuery((resolve, reject) => {
            User.create(body, (err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Create done", user: doc });
            })
        })
    }

    update(query, body) {
        return super.documentQuery((resolve, reject) => {
            User.updateOne(query, body, { upsert: true }).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Update done" });
            })
        })
    }

    remove(query) {
        return super.documentQuery((resolve, reject) => {
            User.deleteOne(query).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Delete done" });
            })
        })
    }
}

module.exports = new UserService;