/*
 * gulpfile.js
 */

const { dest, parallel, src } = require("gulp");
const babel = require("gulp-babel");
const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");

function css() {
    return src("src/css/*")
        .pipe(cleanCss({
            level: {
                1: { all: true },
                2: { mergeMedia: true }
            }
        }))
        .pipe(dest("dist/css"));
}

function js() {
    return src("src/js/*")
        .pipe(babel({presets: ["@babel/preset-env"]}))
        .pipe(uglify())
        .pipe(dest("dist/js"));
}

exports.build = parallel(css, js);
