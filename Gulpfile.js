/**
 * Created by staticfunction on 8/18/14.
 */
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var dts = require('dts-bundle');
var ts = require('gulp-tsc');

var BUILD_DIR = "bin-build";
var RELEASE_DIR = "bin-release";

gulp.task("compile", function() {
    var stream = gulp.src(['src/signals.ts', 'typings/tsd.d.ts'])
        .pipe(ts({
            module: "commonjs",
            declaration: true
        }))
        .pipe(gulp.dest(BUILD_DIR));

    return stream;
});

gulp.task('release', function() {
    gulp.src(BUILD_DIR + '/signals.js')
        .pipe(browserify())
        .pipe(gulp.dest(RELEASE_DIR));

    dts.bundle({
        name: "stfu-signals",
        main: BUILD_DIR + '/signals.d.ts',
        out:  'stfu-signals.d.ts'
    });

    gulp.src(BUILD_DIR + '/stfu-signals').pipe(gulp.dest(RELEASE_DIR));
})


gulp.task("default", ['compile', 'release']);