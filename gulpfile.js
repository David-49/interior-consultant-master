const { src, dest, series, watch, parallel } = require("gulp");
const sass = require("gulp-sass");
const del = require("del");

function processSass() {
  return src("sass/*.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("css", { sourcemaps: "." }));
}

function clean() {
  return del(["*.png", "*.jpg"]);
}

/*exports.default = series(clean, processSass);*/
exports.default = function () {
  watch("sass/*.scss", series(clean, processSass));
};
