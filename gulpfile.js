const { src, dest, series, parallel } = require("gulp");
const sass = require("gulp-sass");
const del = require("del");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const rename = require("gulp-rename");
//const sourcemaps = require("gulp-sourcemaps");

function processHTML() {
  return src("src/*.html").pipe(dest("dist"));
}

function processIMG() {
  return src("src/images/*.png").pipe(dest("dist/images"));
}

function processSass() {
  return src(["src/sass/*.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("dist/css"))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(dest("dist/css"));
}

function clean() {
  return del(["dist"]);
}

exports.default = series(clean, parallel(processHTML, processIMG, processSass));
/* exports.default = function () {
  watch("sass/*.scss", processSass);
}; */
