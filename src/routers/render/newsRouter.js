const express = require('express');
const router = express.Router();
const newsController = require('../../app/controller/newsController');

router.get("/:slug", newsController.detail);
router.get("/", newsController.index);

module.exports = router;