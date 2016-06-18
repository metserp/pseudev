var gulp    = require('gulp'),
    coffee  = require('gulp-coffee'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename');


gulp.task('build', function(){
  return gulp.src('./src/**/*.coffee')
          .pipe(coffee({bare: true}))
          .pipe(gulp.dest('./'));
});

gulp.task('minification', function(){
  return gulp.src('./dist/*.js')
          .pipe(uglify())
          .pipe(rename({suffix: ".min"}))
          .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['build','minification']);
