const connection = require("../connection/connection");
const Core = require("./core");


class UserModule extends Core {

    constructor() {
        super();
    }

    isUser(user) {
        let query = { email: { $eq: user.email }, password: { $eq: user.password } };
        return this.findOneUser(query);
    }

    findUser() {
        return super.find("shopping", "user");
    }

    findOneUser(query) {
        return super.findOne("shopping", "user", query);
    }

    createUser(body) {
        return super.createOne("shopping", "user", body);
    }

    updateUser(query, body) {
        return super.updateOne("shopping", "user", query, body);
    }

    deleteUser(query) {
        return super.deleteOne("shopping", "user", query);
    }

}

module.exports = new UserModule;