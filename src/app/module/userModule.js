const connection = require("../connection/connection");
const Core = require("./core");


class UserModule extends Core {
    // Cloud
    db = "codeudemy";
    collection = "courses";

    // Local
    // db = "shopping";
    // collection = "user";

    constructor() {
        super();
    }

    /**
     * 
     * Method count all document in collection
     * Return number after count all document
     */
    countUser() {
        return super.countDocumentInCollection(this.db, this.collection);
    }

    /**
    * 
    * Method check user exists in database
    * @param {*} user is object
    * User has property Email
    * User has property Password
    * @returns one user.
    * */
    isUser(user) {
        let query = { email: { $eq: user.email }, password: { $eq: user.password } };
        return this.findOneUser(query);
    }

    /**
     * 
     * Method get all document in collection
     * @returns Promise method find get all document exists in collection else return null
     */
    findUser() {
        return super.find(this.db, this.collection);
    }

    /**
     * 
     * Method get one document in collection
     * @param {*} query object condition query
     * @example let query = {_id: {$eq: new ObjectId("6222dc2bee8e613bb84aa00c")}}
     * @returns one user or null
     */
    findOneUser(query) {
        return super.findOne(this.db, this.collection, query);
    }

    /**
     * 
     * Method get list document in collection has limit
     * @param {*} limit type number
     * @param {*} start type number
     * @returns list user or null
     */
    findLimit(limit, start) {
        return Promise.all([super.findLimit(this.db, this.collection, limit, start), super.countDocumentInCollection(this.db, this.collection)]);
        // return super.findLimit(this.db, this.collection, limit, start);
    }

    /**
     * 
     * Method create user
     * @param {*} body document user
     * @returns Promise status excuted create user
     */
    createUser(body) {
        return super.createOne(this.db, this.collection, body);
    }

    /**
     * 
     * Method update one user
     * @param {*} query find user want update
     * @param {*} body  document user want update
     * @example let query = {_id: {$eq: new ObjectId("6222dc2bee8e613bb84aa00c")}}
     * @returns Promise status excuted update
     */
    updateUser(query, body) {
        return super.updateOne(this.db, this.collection, query, body);
    }

    /**
     * 
     * Method delete one user
     * @param {*} query find user want delete
     * @example let query = {_id: {$eq: new ObjectId("6222dc2bee8e613bb84aa00c")}}
     * @returns Promise status excuted delete
     */
    deleteUser(query) {
        return super.deleteOne(this.db, this.collection, query);
    }

}

module.exports = new UserModule;