/**
 * Created by staticfunction on 8/18/14.
 */
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var dts = require('dts-bundle');
var ts = require('gulp-tsc');
var mocha = require('gulp-mocha');

var BUILD_DIR = "bin-build";
var RELEASE_DIR = "bin-release";

/**
 * TODO: fully automate build and release
 * -have dts-bundle working properly. dts-bundle fails when you have external dependencies
 * -autoincrement version after release
 */

gulp.task("compile", function() {
    var stream = gulp.src(['src/signals.ts', 'typings/tsd.d.ts'])
        .pipe(ts({
            module: "commonjs",
            declaration: true
        }))
        .pipe(gulp.dest(BUILD_DIR));

    return stream;
});

gulp.task('test', function() {
    return gulp.src('test/**/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('bundle', function(cb) {
    dts.bundle({
        name: "stfu-signals",
        main: BUILD_DIR + '/signals.d.ts',
        out:  'stfu-signals.d.ts'
    });

    cb();
})

gulp.task('release', function() {
    gulp.src(BUILD_DIR + '/signals.js')
        .pipe(gulp.dest(RELEASE_DIR));

    gulp.src(['package.json','README.md','LICENSE'])
        .pipe(gulp.dest(RELEASE_DIR));

    gulp.src(BUILD_DIR + '/stfu-signals.d.ts').pipe(gulp.dest(RELEASE_DIR));
})
