/**
 * Created by staticfunction on 8/18/14.
 */
var gulp = require('gulp');
var browserify = require('browserify');
var dts = require('dts-bundle');
var ts = require('gulp-typescript');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var replace = require('gulp-replace');
var insert = require('gulp-insert');
var filter = require('gulp-filter');
var merge = require('merge2');
var mocha = require('gulp-mocha');
var del = require('del');
var pkg = require('./package.json');

var BUILD_DIR = "bin-build";
var RELEASE_DIR = "bin-release";

var srcProject = ts.createProject({
    module: "commonjs",
    sortOutput: true
})

gulp.task("debug", function() {
    var srcOnly = filter(['*','!**Spec.js']);
    var testOnly = filter(['**Spec.js']);

    var commonjs =
        gulp.src(['src/signals.ts', 'test/**Spec.ts','typings/tsd.d.ts'])
            .pipe(sourcemaps.init())
            .pipe(ts(srcProject))

       return merge([
           commonjs.js
               .pipe(sourcemaps.write({includeContent: false, sourceRoot: 'src'}))
               .pipe(srcOnly)
               .pipe(gulp.dest('bin-debug/src'))
               .pipe(srcOnly.restore())
               .pipe(testOnly)
               .pipe(gulp.dest('bin-debug/test'))
           ]);
});


gulp.task('test', ['debug'], function() {
    return gulp.src('bin-debug/test/**/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('bundle', function(cb) {
    dts.bundle({
        name: "stfu-signals",
        main: BUILD_DIR + 'signals.d.ts',
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
