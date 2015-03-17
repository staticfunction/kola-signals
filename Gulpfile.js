/**
 * Created by staticfunction on 8/18/14.
 */
var gulp = require('gulp');
var browserify = require('browserify');
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

gulp.task('clean-dist', function(cb) {
    del(['dist'], cb);
})

gulp.task('release', ['clean-dist'], function() {
    var commonjs = gulp.src(['src/signals.ts', 'typings/tsd.d.ts'])
        .pipe(ts({
            declarationFiles: true,
            module: "commonjs"
        }));

    var amd = gulp.src(['src/signals.ts', 'typings/tsd.d.ts'])
        .pipe(ts({
            declarationFiles: true,
            module: "amd"
        }));


    return merge([
        commonjs.js
            .pipe(gulp.dest('dist')),
        commonjs.dts
            .pipe(replace(/declare\s/g, ''))
            .pipe(insert.wrap('declare module \"'+ pkg.name +'\" {\n', '\n}'))
            .pipe(gulp.dest('dist')),
        amd.js
            .pipe(gulp.dest('dist/amd'))
    ])
})
