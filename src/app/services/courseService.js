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
    // countCourse() {
    //     return super.documentQuery((resolve, reject) => {
    //         resolve(Course.count({}));
    //     })
    // }


    
    // NEW FUNCTIONS
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

        limit(limit, start) {
            return super.documentQuery((resolve, reject) => {
                Course.find({}).limit(limit).skip(start).exec((err, doc) => {
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

        delete(query) {
            return super.documentQuery((resolve, reject) => {
                Course.deleteOne(query).exec((err, doc) => {
                    if (err) reject(err);
                    resolve({ status: true, message: "Delete done" });
                })
            })
        }

    // NEW FUNCTIONS

    /**
     * 
     * Method delete not sort
     * @param {*} query query condition find course when delete
     * @returns tatus after delete course
     */
    // deleteCourse(query) {
    //     return super.documentQuery((resolve, reject) => {
    //         Course.deleteOne(query).exec((err, doc) => {
    //             if (err) reject(err);
    //             resolve({ status: true, message: "Delete done" });
    //         })
    //     })
    // }

}

module.exports = new CourseService;
