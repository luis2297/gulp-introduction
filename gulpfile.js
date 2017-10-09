var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var ts = require('gulp-typescript');

var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');
var isProduction = process.env.NODE_ENV === "production"

var tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript')
});

gulp.task('scripts', function() {
  var tsResult = gulp.src("scripts/**/*.ts")
      .pipe(tsProject());
  return tsResult.js
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulp.dest('public/'));
});

gulp.task('serve', function () {
      browserSync.init({
          server: {
              baseDir: "public/",
              index: "london.html"
          }
      });
});

gulp.task('views', function buildHTML() {
  return gulp.src('views/*.pug')
  .pipe(pug({
    pretty: !isProduction
  }))
  .pipe(gulp.dest("public/"))
});

gulp.task('styles', function () {
  return gulp.src('./styles/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(isProduction, uglifycss()))
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.stream());
});


gulp.task('default', function() {

  runSequence('scripts', ['styles', 'views'], 'serve');

  gulp.watch("views/**/*.pug", ['views']);
  gulp.watch("scripts/**/*.ts", ['scripts']);
  gulp.watch("styles/*.sass", ['styles']);
  gulp.watch("public/*.html").on('change', browserSync.reload);
  gulp.watch("public/*.js").on('change', browserSync.reload);
});

