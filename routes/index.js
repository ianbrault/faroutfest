/*
 * index.js
 * routing logic
 * author: Ian Brault <ian.brault@engineering.ucla.edu>
 */

const express = require("express");
const router = express.Router();

router.get("/faq", function(req, res) {
    res.render("faq");
});

router.get("/", function(req, res) {
    res.render("index");
});

module.exports = router;
