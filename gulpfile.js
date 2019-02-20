/*
 * gulpfile.js
 */

const { series, parallel } = require("gulp");

function clean(cb) {
    cb();
}

function css(cb) {
    cb();
}

function js(cb) {
    cb();
}

exports.build = series(clean, parallel(css, js));
