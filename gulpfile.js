var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript')
});


gulp.task('scripts', function() {
  var tsResult = gulp.src("scripts/**/*.ts")
      .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('public/'));
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
    pretty: true
  }))
  .pipe(gulp.dest("public/"))
});

gulp.task('styles', function () {
  return gulp.src('./styles/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.stream());
});

gulp.task('default', ["serve"], function() {
  // place code for your default task here
  gulp.watch("views/**/*.pug", ['views']);
  gulp.watch("scripts/**/*.ts", ['scripts']);
  gulp.watch("styles/*.sass", ['styles']);
  gulp.watch("public/*.html").on('change', browserSync.reload);
  gulp.watch("public/*.js").on('change', browserSync.reload);
});

