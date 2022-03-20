const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // let path = `${__dirname.split("src")[0]}\src\\assets\\img`; // local path
        let path = `${__dirname.split("src")[0]}\src/assets/img`; // serve path
        cb(null, path);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

module.exports = upload