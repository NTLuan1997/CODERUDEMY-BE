const Service = require("./service");
const ObjectId = require("mongodb").ObjectId;
const Unit = require("../module/unit");

class UnitService extends Service {

    constructor() {
        super();
    }

    /**
     * 
     * Method count Unit.
     * @Returns Number all Units of collection.
     */
    countUnit(query) {
        return super.documentQuery((resolve, reject) => {
            resolve(Unit.count(query));
        })
    }

    /**
     * 
     * Method find one Unit.
     * @param {*} id condition find single Unit.
     * @returns One Unit document in collection.
     */
    findOneUnit(query) {
        return super.documentQuery((resolve, reject) => {
            Unit.findOne(query).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        })
    }

    /**
     * 
     * Method find all Units.
     * @returns List all Units of collection.
     */
    findUnit() {
        return super.documentQuery((resolve, reject) => {
            Unit.find({}).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        })
    }

    /**
     * 
     * Method find unit with limit.
     * @param {*} limit number want get
     * @param {*} start location begin get
     * @returns list units registry of []
     */
    findLimitUnit(query, limit, start) {
        return Promise.all([super.documentQuery((resolve, reject) => {
            Unit.find(query).limit(limit).skip(start).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        }), this.countUnit(query)]);
    }


    /**
     * 
     * Method create unit.
     * @param {*} body information new unit
     * @returns status after create unit
     */
    newUnit(body) {
        return super.documentQuery((resolve, reject) => {
            Unit.create(body, (err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Create done" })
            })
        })
    }

    /**
     * 
     * Method update unit.
     * @param {*} query condition find unit when update
     * @param {*} body information update unit 
     * @returns status after update unit
     */
    updateUnit(query, body) {
        return super.documentQuery((resolve, reject) => {
            Unit.updateOne(query, body, { upsert: true }).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Update done" });
            })
        })
    }

    /**
     * 
     * Method delete not sort
     * @param {*} query query condition find unit when delete
     * @returns tatus after delete unit
     */
    deleteUnit(query) {
        return super.documentQuery((resolve, reject) => {
            Unit.deleteOne(query).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Delete done" });
            })
        })
    }

}

module.exports = new UnitService;
