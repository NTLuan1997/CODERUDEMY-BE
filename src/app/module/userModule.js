const connection = require("../core/connection");

class UserModule {

    constructor() { }

    isUser(user) {
        let query = { email: { $eq: user.email }, password: { $eq: user.password } };
        return this.findOneUser(query);
    }

    createUser(body) {
        return new Promise((resolve, reject) => {
            connection.connect((err, client) => {
                try {
                    client.db("shopping").collection("user").insertOne(body, (err, res) => {
                        if (err) reject({ status: false, message: err });
                        resolve({ status: true, message: "Insert successfuly!!!" })
                        client.close();
                    })
                } catch (err) {
                    console.log(err);
                }
            })
        })
    }

    updateUser(query, body) {
        return new Promise((resolve, reject) => {
            connection.connect((err, client) => {
                try {
                    client.db("shopping").collection("user").updateOne(query, body, (err, res) => {
                        if (err) reject({ status: false, message: err });
                        resolve({ status: true, message: "Update Successfuly!!!" });
                        client.close();
                    })
                } catch (err) {
                    console.log(err);
                }
            })
        })
    }

    deleteUser(query) {
        return new Promise((resolve, reject) => {
            connection.connect((err, client) => {
                try {
                    let dbase = client.db("shopping");
                    dbase.collection("user").deleteOne(query, (err, res) => {
                        if (err) reject({ status: false, message: err });
                        resolve({ status: true });
                        client.close();
                    })
                } catch (err) {
                    console.log(err);
                }
            })
        })
    }

    findUser() {
        return new Promise((resolve, reject) => {
            connection.connect((err, client) => {
                try {
                    const dbase = client.db('shopping');
                    dbase.collection('user').find().toArray((err, result) => {
                        if (err) reject({ status: false, message: err });
                        resolve(result);
                    })
                } catch (err) {
                    throw err;
                }
            })
        })
    }

    findOneUser(query) {
        return new Promise((resolve, reject) => {
            connection.connect((err, client) => {
                try {
                    client.db("shopping").collection("user").findOne(query, function (err, result) {
                        if (err) reject(err);
                        resolve(result);
                        client.close();
                    })
                } catch (err) {
                    throw err;
                }
            })
        })
    }

}

module.exports = new UserModule;