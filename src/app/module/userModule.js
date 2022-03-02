const { clinet } = require("../core/connection");
const connection = require("../core/connection");

class UserModule {
    user = [];
    userPass = false;

    constructor() {
        connection.connect((err, client) => {
            try {
                const dbase = client.db('shopping');
                dbase.collection('user').find().toArray((err, result) => {
                    if (err) throw err;
                    Object.assign(this.user, result);
                })

            } catch (err) {
                throw err;
            }
        })
    }

    isUser(email, password) {
        this.user.forEach((e) => {
            if (e?.email == email && e?.password == password) this.userPass = true;
        })
        return this.userPass;
    }

    findUser() {
        return (!!this.user.length) ? this.user : [];
    }



}

module.exports = new UserModule;