const Service = require("./service");
const ObjectId = require("mongodb").ObjectId;
const Lessons = require("../module/lesson");

class LessonService extends Service {

    constructor() {
        super();
    }

    /**
     * 
     * Method count Unit.
     * @Returns Number all Units of collection.
     */
    countLesson(query) {
        return super.documentQuery((resolve, reject) => {
            resolve(Lessons.count(query));
        })
    }

    /**
     * 
     * Method find one Unit.
     * @param {*} id condition find single Unit.
     * @returns One Unit document in collection.
     */
    findOneLesson(query) {
        return super.documentQuery((resolve, reject) => {
            Lessons.findOne(query).exec((err, doc) => {
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
    findLesson() {
        return super.documentQuery((resolve, reject) => {
            Lessons.find({}).exec((err, doc) => {
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
    findLimitLesson(query, limit, start) {
        return Promise.all([super.documentQuery((resolve, reject) => {
            Lessons.find(query).limit(limit).skip(start).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        }), this.countLesson(query)]);
    }


    /**
     * 
     * Method create unit.
     * @param {*} body information new unit
     * @returns status after create unit
     */
    newLesson(body) {
        return super.documentQuery((resolve, reject) => {
            Lessons.create(body, (err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Create done" });
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
    updateLesson(query, body) {
        // return new Promise((resolve, reject) => {
        //     super.documentQuery((resolve, reject) => {
        //         Lessons.updateOne(query, body, { upsert: true }).exec((err, doc) => {
        //             if (err) reject(err);
        //             resolve({ status: true, message: "Update done" });
        //         })
        //         .then((state) => {
        //             if(state.status) {
        //                 return state;
        //             } else {
        //                 reject({status: false, message: "Upload false"});
        //             }
        //         })
        //         .then((state) => {
        //             this.countLesson()
        //         })
        //     })
        // })
    }

    /**
     * 
     * Method delete not sort
     * @param {*} query query condition find unit when delete
     * @returns tatus after delete unit
     */
    deleteLesson(query) {
        return super.documentQuery((resolve, reject) => {
            Lessons.deleteOne(query).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Delete done" });
            })
        })
    }

}

module.exports = new LessonService;
