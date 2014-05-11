var gulp = require('gulp')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , bower = require('gulp-bower-files')
  , rename = require('gulp-rename');


gulp.task('bower', function() {
  var options = {
    paths:{
      bowerDirectory : 'client/bower_components', 
      bowerJson : 'client/bower.json'
    }
  };

  var s = bower(options)
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('client/lib'));
});