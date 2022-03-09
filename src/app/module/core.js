const connection = require("../connection/connection");

class Core {

    constructor() {
        connection.reConnect().connect((err, client) => {
            if (err) throw err;
            console.log("Check connect to db cloud");
            client.db("shopping").collection("user").find().forEach((e) => { console.log(e) });
        })
    }

    countDocumentInCollection(db_name, collection_name) {
        return new Promise((resolve, reject) => {
            connection.connect((err, client) => {
                try {
                    client.db(db_name).collection(collection_name).find().count((err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    })
                } catch (err) {
                    throw err;

                } finally {
                    client.close();
                }
            })
        })
    }

    // [Find all document in collection]
    find(db_name, collection_name) {
        return new Promise((resolve, reject) => {
            connection.connect((err, client) => {
                try {
                    client.db(db_name).collection(collection_name).find().toArray((err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    })

                } catch (err) {
                    console.log(err);

                } finally {
                    client.close();
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
                    })

                } catch (err) {
                    throw err;

                } finally {
                    // client.close();
                    console.log("Connect done");
                }
            })
        })
    }

    // [Find limit document in collection]
    findLimit(db_name, collection_name, limit, start) {
        return new Promise((resolve, reject) => {
            connection.connect((err, client) => {
                try {
                    client.db(db_name).collection(collection_name).find().limit(limit).skip(start).toArray((err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    })
                } catch (err) {
                    throw err;

                } finally {
                    client.close();
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
                    })

                } catch (err) {
                    throw err;

                } finally {
                    client.close();
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
                    })

                } catch (err) {
                    throw err;

                } finally {
                    client.close();
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
                    })

                } catch (err) {
                    throw err;

                } finally {
                    client.close();
                }
            })
        })
    }

}

module.exports = Core;