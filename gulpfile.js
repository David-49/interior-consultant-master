const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass");
const del = require("del");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const rename = require("gulp-rename");
const newer = require("gulp-newer");
//const sourcemaps = require("gulp-sourcemaps");

const imgDest = "dist/images";

function processHTML() {
  return src("src/*.html").pipe(dest("dist"));
}

function processIMG() {
  return src("src/images/*.png").pipe(newer(imgDest)).pipe(dest("dist/images"));
}

function processSass() {
  return src(["src/sass/*.scss", "!src/sass/breakpoints.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("src/css"));
}

function processMinify() {
  return src("src/css/*.css")
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

/*exports.default = series(
  clean,
  processSass,
  parallel(processHTML, processIMG, processMinify)
);*/

exports.default = function () {
  watch("src/sass/*.scss", processSass);
};
