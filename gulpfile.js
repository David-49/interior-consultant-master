const { src, dest, series } = require("gulp");
const sass = require("gulp-sass");
const del = require("del");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");

function processSass() {
  return src(["sass/*.scss", "!sass/breakpoints.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("css"))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(dest("css"));
}

function clean() {
  return del(["css"]);
}

exports.default = series(clean, processSass);
/* exports.default = function () {
  watch("sass/*.scss", processSass);
}; */
