var gulp = require('gulp')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , bower = require('gulp-bower-files')
  , rename = require('gulp-rename');

gulp.task('bower', function() {
  bower({paths:{
    bowerDirectory : 'client/bower_components', 
    bowerJson : 'client/bower.json'
  }})
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('client/src/lib'));
});

gulp.task('dependencies', function() {
  return gulp.src('client/bower_components/underscore/underscore.js')
    .pipe(gulp.dest('client/src/lib'));
});

gulp.task('scripts', function() {
  var scripts = [
    'client/src/lib/angular.js',
    'client/src/lib/underscore*.js',
    'client/src/lib/*.js',
    'client/src/js/*.js'
  ];

  return gulp.src(scripts)
    .pipe(uglify())
    .pipe(concat('index.min.js'))
    .pipe(gulp.dest('client'));
});

gulp.task('watch', function() {
  gulp.watch(['client/src/lib/*.js', 'client/src/js/*.js'], ['scripts']);
  gulp.watch(['client/bower.json'], ['bower', 'dependencies']);
});

gulp.task('default', ['watch']);