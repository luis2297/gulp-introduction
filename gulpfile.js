var gulp = require('gulp');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();

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
    // Your options in here.
  }))
  .pipe(gulp.dest("public/"))
});

gulp.task('default', ["serve"], function() {
  // place code for your default task here
  gulp.watch("views/*.pug", ['views']);
});

