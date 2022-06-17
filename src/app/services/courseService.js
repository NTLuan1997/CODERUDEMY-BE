const Service = require("./service");
const Course = require("../module/course");
class CourseService extends Service {

    constructor() {
        super();
    }

    /**
     * 
     * Method count Course.
     * @Returns Number all Courses of collection.
     */
    // countCourse() {
    //     return super.documentQuery((resolve, reject) => {
    //         resolve(Course.count({}));
    //     })
    // }

    edit(query, body) {
        return super.documentQuery((resolve, reject) => {
            Course.updateOne(query, body, { upsert: true }).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Update done" });
            })
        })
    }

    find(condition) {
        let query = (condition)? condition : {};
        return super.documentQuery((resolve, reject) => {
            Course.find(query).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        })
    }

    limit(condition, limit, start) {
        let query = (condition)? condition : {};
        return super.documentQuery((resolve, reject) => {
            Course.find(query).limit(limit).skip(start).exec((err, doc) => {
                if(err) reject(err);
                resolve(doc);
            })
        })
    }

    saved(course) {
        return super.documentQuery((resolve, reject) => {
            Course.create(course, (err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Create done", course: doc });
            })
        })
    }

    restore(query, body) {
        return super.documentQuery((resolve, reject) => {
            Course.updateMany(query, body, { upsert: true }).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Update done" });
            })
        })
    }

    delete(query) {
        return super.documentQuery((resolve, reject) => {
            Course.deleteOne(query).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Delete done" });
            })
        })
    }

}

module.exports = new CourseService;
