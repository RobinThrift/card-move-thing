
module.exports = function(gulp, config) {
    gulp.task('scripts:bundle', ['lint'], function() { 
        var browserify = require('browserify'),
            source     = require('vinyl-source-stream'),
            babelify   = require('babelify');

        return browserify(config.paths.scripts.main, {
                    baseDir: config.pwd,
                    debug: (config.target === 'dev')
                })
                .transform('babelify', {presets: ['es2015', 'react']})
                .bundle()
                .pipe(source('main.min.js'))
                .pipe(gulp.dest(config.paths.dest + '/scripts'));
    });

    gulp.task('scripts', ['scripts:bundle']);
};
