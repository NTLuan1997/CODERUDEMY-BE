const connection = require("../connection/connection");
const Core = require("./core");


class UserModule extends Core {
    db = "shopping";
    collection = "user";

    constructor() {
        super();
    }

    isUser(user) {
        let query = { email: { $eq: user.email }, password: { $eq: user.password } };
        return this.findOneUser(query);
    }

    findUser() {
        return super.find(this.db, this.collection);
    }

    findOneUser(query) {
        return super.findOne(this.db, this.collection, query);
    }

    createUser(body) {
        return super.createOne(this.db, this.collection, body);
    }

    updateUser(query, body) {
        return super.updateOne(this.db, this.collection, query, body);
    }

    deleteUser(query) {
        return super.deleteOne(this.db, this.collection, query);
    }

}

module.exports = new UserModule;