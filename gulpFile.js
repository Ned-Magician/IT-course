const { src, dest, watch, series, lastRun } = require("gulp");
const gulp = require("gulp");
const terser = require("gulp-terser");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
//------Copy Fonts----------
function fontTask() {
  return gulp
    .src("src/assets/fonts/*", { sourcemaps: true })
    .pipe(gulp.dest("dist/fonts", { sourcemaps: "." }));
}

// ----clean -------
// function clean:dist() {
//   return del.sync("dist");
// }

// ----terser  compiler -------
function jsTask() {
  return gulp
    .src("src/assets/js/*.js", { sourcemaps: true })
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(gulp.dest("dist/js", { sourcemaps: "." }));
}
// ----SCSS to CSS & compiler -------
function scssTask() {
  const plugins = [autoprefixer(), cssnano()];
  return gulp
    .src("src/assets/sass/*.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("main.css"))
    .pipe(postcss(plugins))
    .pipe(gulp.dest("dist/css", { sourcemaps: "." }));
}
//---------image-cache Minify--------
// function images() {
//   return src("src/assets/img/**/*.jpg", { since: lastRun(images) })
//     .pipe(imagemin())
//     .pipe(dest("build/img/"));
// }
// Watch Task
function watchTask() {
  watch(
    ["src/assets/fonts/*", "src/assets/js/*.js", "src/assets/sass/*"],
    series(fontTask, jsTask, scssTask)
  );
}
exports.default = series(fontTask, jsTask, scssTask, watchTask);
