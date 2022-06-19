const Service = require("./service");
// const ObjectId = require("mongodb").ObjectId;
const Client = require("../module/client");
class ClientService extends Service {

    constructor() {
        super();
    }

    /**
     * 
     * Method count Course.
     * @Returns Number all Courses of collection.
     */
    count(condition) {
        let query = (condition)? condition : {};
        return super.documentQuery((resolve, reject) => {
            resolve(Client.count(query));
        })
    }

    exists(condition) {
        let query = (condition)? condition : {};
        return super.documentQuery((resolve, reject) => {
            Client.exists(query, (err, doc) => {
                if (err) reject(err);
                let client = doc;
                if(doc) {
                    client = {status: (doc?._id)? true : false, client: doc?._id};
                }
                resolve(client);
            })
        })
    }

    find(condition) {
        let query = (condition)? condition : {};
        return super.documentQuery((resolve, reject) => {
            Client.find(query).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        })
    }

    limited(condition, limit, start) {
        let query = (condition)? condition : {};
        return super.documentQuery((resolve, reject) => {
            Client.find(query).limit(limit).skip(start).exec((err, doc) => {
                if(err) reject(err);
                resolve(doc);
            })
        })
    }

    saved(body) {
        return super.documentQuery((resolve, reject) => {
            Client.create(body, (err, doc) => {
                if (err) reject(err);
                resolve({ status: true, doc });
            })
        })
    }

    restore(query, body) {
        return super.documentQuery((resolve, reject) => {
            Client.updateMany(query, body, { upsert: true }).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Update done" });
            })
        })
    }

    update(condition, body) {
        return super.documentQuery((resolve, reject) => {
            Client.updateOne(condition, body, (err, doc) => {
                if(err) reject(err);
                resolve({status: true, message: "update done"});
            })
        })
    }

    delete(query) {
        return super.documentQuery((resolve, reject) => {
            Client.deleteOne(query).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Delete done"});
            })
        })
    }

}

module.exports = new ClientService;
