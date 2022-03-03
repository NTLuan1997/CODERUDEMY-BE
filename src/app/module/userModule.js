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

    createUser(body) {
        connection.connect((err, client) => {
            try {
                let db = client.db("shopping");
                db.collection("users").insertOne(body, (err, res) => {
                    if (err) throw err;
                    console.log("Insert successfuly!!!");
                    db.close();
                })

            } catch (err) {
                console.log(err);
            }
        })
    }

    updateUser(query, body) {
        connection.connect((err, client) => {
            try {
                let dbase = client.db("shopping");
                dbase.collection("user").updateOne(query, body, (err, res) => {
                    if (err) throw err;
                    console.log("Update Successfuly!!!");
                    client.close();
                })

            } catch (err) {
                console.log(err);
            }
        })
    }

    deleteUser(query) {
        connection.connect((err, client) => {
            try {
                let db = client.collection("users").deleteOne(query, (err, res) => {
                    if (err) throw err;
                    console.log("Delete Successfuly!!!");
                    db.close();
                })

            } catch (err) {
                console.log(err);
            }
        })
    }

    findUser() {
        return (!!this.user.length) ? this.user : [];
    }

}

module.exports = new UserModule;