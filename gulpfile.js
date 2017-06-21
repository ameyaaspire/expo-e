var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var exec = require('child_process').exec;
var concat = require('gulp-concat');
var minify = require('gulp-minify');

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('./public/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

//prebuild task to clear the old data
gulp.task('prebuild', function (cb) {
  exec('mongo localhost:27017/expo-dev --quiet clear-mongo.js', function (err, stdout, stderr) {
    console.log("DB Successfully Cleared");
    cb(err);
  });
  gulp.start('build');
});

// build task to minify and concat the js files.
gulp.task('build', function() {
  gulp.src('./public/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(minify({
        ext:{
            src:'.js',
            min:'-min.js'
        },
    }))
    .pipe(gulp.dest('./public/dist/'));
    gulp.start('postbuild');
});

// post build task to popluate the db
gulp.task('postbuild', function (cb) {
  exec('mongo localhost:27017/expo-dev --quiet mongo.js', function (err, stdout, stderr) {
    console.log("DB Successfully Populated");
    cb(err);
  });
});

// task to run the server
gulp.task('run_server', function (cb) {
  exec('nodemon server.js', function (err, stdout, stderr) {
    console.log(stdout);
    cb(err);
  });
});

gulp.task('default', ['jshint','prebuild']);