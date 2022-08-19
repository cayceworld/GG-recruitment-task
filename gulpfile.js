const { src, dest, watch, series, parallel } = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
var browsersync = require('browser-sync').create();


// File paths
const files = {
  scssPath: 'src/scss/**/*.scss',
  jsPath: 'src/js/**/*.js'
};

function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass([])) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(dest('dist')
      .pipe(browsersync.stream())
    ); // put final CSS in dist folder
}

function jsTask() {
  return src([
    files.jsPath
  ])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(dest('dist')
      .pipe(browsersync.stream())
    );
}

var cbString = new Date().getTime();
function cacheBustTask() {
  return src(['index.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest('.'));
}

function watchTask() {
  browsersync.init({
    server: {
      baseDir: "./"
    }
  });

  watch([files.scssPath, files.jsPath],
    parallel(scssTask, jsTask));

}

exports.default = series(
  parallel(scssTask, jsTask),
  cacheBustTask,
  watchTask
);