const Service = require("./service");
const ObjectId = require("mongodb").ObjectId;
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
    countCourse() {
        return super.documentQuery((resolve, reject) => {
            resolve(Course.count({}));
        })
    }

    /**
     * 
     * Method find one Course.
     * @param {*} id condition find single course.
     * @returns One Course document in collection.
     */
    findOneCourse(id) {
        let query = { "_id": { "_id": new ObjectId(id) } };
        return super.documentQuery((resolve, reject) => {
            Course.findOne(query).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        })
    }

    /**
     * 
     * Method find all Courses.
     * @returns List all Courses of collection.
     */
    findCourse() {
        return super.documentQuery((resolve, reject) => {
            Course.find({}).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        })
    }

    /**
     * 
     * Method find course with limit.
     * @param {*} limit number want get
     * @param {*} start location begin get
     * @returns list courses registry of []
     */
    findLimitCourse(limit, start) {
        return Promise.all([super.documentQuery((resolve, reject) => {
            Course.find({}).limit(limit).skip(start).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        }), this.countCourse]);
    }


    /**
     * 
     * Method create course.
     * @param {*} body information new course
     * @returns status after create course
     */
    newCourse(body) {
        return super.documentQuery((resolve, reject) => {
            Course.create(body, (err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Create done" })
            })
        })
    }

    /**
     * 
     * Method update course.
     * @param {*} query condition find course when update
     * @param {*} body information update course 
     * @returns status after update course
     */
    updateCourse(query, body) {
        return super.documentQuery((resolve, reject) => {
            Course.updateOne(query, body, { upsert: true }).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Update done" });
            })
        })
    }

    /**
     * 
     * Method delete not sort
     * @param {*} query query condition find course when delete
     * @returns tatus after delete course
     */
    deleteCourse(query) {
        return super.documentQuery((resolve, reject) => {
            Course.deleteOne(query).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Delete done" });
            })
        })
    }

}

module.exports = new CourseService;
