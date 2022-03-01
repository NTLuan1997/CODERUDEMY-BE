const { clinet } = require("../core/connection");
const connection = require("../core/connection");

class UserModule {
    user = [];

    constructor() {
        connection.reConnect((err, client) => {
            try {
                const dbase = client.db('shopping')
                dbase.collection('user').find().toArray((err, result) => {
                    if (err) throw err;
                    Object.assign(this.user, result);
                })

            } catch (err) {
                throw err;
            }
        })
    }

    isUser(email = null, password = null) {
        console.log(this.user);
    }

}

module.exports = new UserModule;