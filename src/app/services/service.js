const connection = require("../connection/connection");

class Service {

    constructor() { }

    /**
     * 
     * Method call connect to database and executed query.
     * @param {*} callback Method executed function query to mongodb.
     * @Returns Object Promise.
     */
    documentQuery(callback) {
        return new Promise((resolve, reject) => {
            connection.reConnect()
                .then(() => {
                    callback(resolve, reject);
                })
                .catch((err) => {
                    throw err;
                })
        })
    }
}

module.exports = Service;