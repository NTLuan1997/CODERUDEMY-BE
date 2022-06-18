const Service = require("./service");
const Lesson = require("../module/lesson");

class LessonService extends Service {

    constructor() {
        super();
    }

    count(condition) {
        let query = (condition)? condition: {};
        return super.documentQuery((resolve, reject) => {
            resolve(Lesson.count(query));
        })
    }

    find(condition) {
        let query = (condition)? condition: {};
        return super.documentQuery((resolve, reject) => {
            Lesson.find(query).exec((err, doc) => {
                if(err) reject(err);
                resolve(doc);
            })
        })
    }

    saved(body) {
        return super.documentQuery((resolve, reject) => {
            Lesson.create(body, (err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Create done", unit: doc });
            })
        })
    }

    update(query, body) {
        return super.documentQuery((resolve, reject) => {
            Lesson.updateOne(query, body, { upsert: true }).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Update done" });
            })
        })
    }

    restore(query, body) {
        return super.documentQuery((resolve, reject) => {
            Lesson.updateMany(query, body, { upsert: true }).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Update done" });
            })
        })
    }

    remove(query) {
        return super.documentQuery((resolve, reject) => {
            Lesson.deleteOne(query).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Delete done" });
            })
        })
    }

}

module.exports = new LessonService;
