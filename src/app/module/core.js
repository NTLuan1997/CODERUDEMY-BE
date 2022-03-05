const connection = require("../connection/connection");

class Core {

    constructor() { }

    // [Find all document in collection]
    find(db_name, collection_name) {
        return new Promise((resolve, reject) => {
            connection.connect((err, client) => {
                try {
                    client.db(db_name).collection(collection_name).find().toArray((err, result) => {
                        if (err) reject(err);
                        resolve(result);
                        client.close();
                    })

                } catch (err) {
                    console.log(err);
                }
            })
        })
    }

    // [Find one document in collection by anything]
    findOne(db_name, collection_name, query) {
        return new Promise((resolve, reject) => {
            connection.connect((err, client) => {
                try {
                    client.db(db_name).collection(collection_name).findOne(query, (err, result) => {
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

    // [Create one document in collection]
    createOne(db_name, collection_name, body) {
        return new Promise((resolve, reject) => {
            connection.connect((err, client) => {
                try {
                    client.db(db_name).collection(collection_name).insertOne(body, (err, res) => {
                        if (err) reject(err);
                        resolve({ status: true, message: "Insert document successful!!!" });
                        client.close();
                    })

                } catch (err) {
                    throw err;
                }
            })

        })
    }

    // [Update one document in collection]
    updateOne(db_name, collection_name, query, body) {
        return new Promise((resolve, reject) => {
            connection.connect((err, client) => {
                try {
                    client.db(db_name).collection(collection_name).updateOne(query, body, (err, res) => {
                        if (err) reject(err);
                        resolve({ status: true, message: "Update document successful!!!" });
                        client.close();
                    })

                } catch (err) {
                    throw err;
                }
            })
        })
    }

    // [Delete one document in collection]
    deleteOne(db_name, collection_name, query, body) {
        return new Promise((resolve, reject) => {
            connection.connect((err, client) => {
                try {
                    client.db(db_name).collection(collection_name).deleteOne(query, body, (err, res) => {
                        if (err) reject(err);
                        resolve({ status: true, message: "Delete document successfully!!!" });
                        client.close();
                    })

                } catch (err) {
                    throw err;
                }
            })
        })
    }

}

module.exports = Core;