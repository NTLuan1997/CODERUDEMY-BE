const express = require('express');
const router = express.Router();
const newsController = require('../../app/controller/newsController');

router.use("/:slug", newsController.detail);
router.use("/", newsController.index);

module.exports = router;