var gulp = require('gulp');
var pug = require('gulp-pug');

gulp.task('views', function buildHTML() {
  return gulp.src('views/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest("public/"))
});

gulp.task('default', function() {
  // place code for your default task here
  gulp.watch("views/*.pug", ['views']);
});

