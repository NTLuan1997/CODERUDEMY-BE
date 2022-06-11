const Service = require("./service");
const Unit = require("../module/unit");

class UnitService extends Service {

    constructor() {
        super();
    }

    count(condition) {
        let query = (condition)? condition: {};
        return super.documentQuery((resolve, reject) => {
            resolve(Unit.count(query));
        })
    }

    find(condition) {
        let query = (condition)? condition: {};
        return super.documentQuery((resolve, reject) => {
            Unit.find(query).exec((err, doc) => {
                if(err) reject(err);
                resolve(doc);
            })
        })
    }

    limit(condition, limit, start) {
        let query = (condition)? condition: {};
        return super.documentQuery((resolve, reject) => {
            Unit.find(query).limit(limit).skip(start).exec((err, doc) => {
                if(err) reject(err);
                resolve(doc);
            })
        })
    }

    saved(body) {
        return super.documentQuery((resolve, reject) => {
            Unit.create(body, (err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Create done", unit: doc });
            })
        })
    }

    update(query, body) {
        return super.documentQuery((resolve, reject) => {
            Unit.updateOne(query, body, { upsert: true }).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Update done" });
            })
        })
    }
}

module.exports = new UnitService;
