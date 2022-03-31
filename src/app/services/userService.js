const ObjectId = require("mongodb").ObjectId;
const User = require("../module/user");
const Service = require("./service");

class UserService extends Service {

    constructor() {
        super();
    }

    /**
     * 
     * Method count User.
     * @Returns number all of Users in collection.
     */
    countUser() {
        return super.documentQuery((resolve, reject) => {
            resolve(User.count({}));
        })
    }

    /**
     * 
     * Method checked user existing.
     * @param {*} email user registry
     * @param {*} password user registry
     * @returns One user registry or []
     */
    isUser(email, password) {
        let query = { email: { $eq: email }, password: { $eq: password } };
        return super.documentQuery((resolve, reject) => {
            User.findOne(query, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        })
    }

    /**
     * 
     * Method find one user by id or email and password.
     * @param {*} id user registry
     * @param {*} email user registry
     * @param {*} password user registry
     * @returns One user registry or []
     */
    findOneUser(id, email, password) {
        let query = (id) ? { "_id": { $eq: new ObjectId(id) } } : { "email": { $eq: email }, "password": { $eq: password } };
        return super.documentQuery((resolve, reject) => {
            User.findOne(query, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        })
    }

    /**
     * 
     * Method find user with limit.
     * @param {*} limit number want get
     * @param {*} start location begin get
     * @returns list users registry of []
     */
    findLimitUser(limit, start) {
        return Promise.all([super.documentQuery((resolve, reject) => {
            User.find({}).limit(limit).skip(start).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        }), this.countUser()]);
    }

    findSingleUser(query) {
        return new Promise((resolve, reject) => {
            User.findOne(query).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        })
    }

    /**
     * 
     * Method create user.
     * @param {*} body information new user
     * @returns status after create user
     */
    newUser(body) {
        return super.documentQuery((resolve, reject) => {
            User.create(body, (err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Create done" })
            })
        })
    }

    /**
     * 
     * Method update user.
     * @param {*} query condition find user when update
     * @param {*} body information update user 
     * @returns status after update user
     */
    updateUser(query, body) {
        return super.documentQuery((resolve, reject) => {
            User.updateOne(query, body, { upsert: true }).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Update done" });
            })
        })
    }

    /**
     * 
     * Method delete not sort
     * @param {*} query query condition find user when delete
     * @returns tatus after delete user
     */
    deleteUser(query) {
        return super.documentQuery((resolve, reject) => {
            User.deleteOne(query).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Delete done" });
            })
        })
    }

}

module.exports = new UserService;