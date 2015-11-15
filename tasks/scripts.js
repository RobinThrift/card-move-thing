
module.exports = function(gulp, config) {
    gulp.task('scripts:bundle', function() { 
        var browserify = require('browserify'),
            source     = require('vinyl-source-stream'),
            tsify      = require('tsify'),
            babelify   = require('babelify'),
            join       = require('path').join,
            tsconfig;

        try {
            tsconfig = require(join(config.cwd, 'tsconfig.json'));
        } catch (e) {
            console.log(`Can't find tsconfig at ${config.cwd}`);
        }

        return browserify(config.paths.scripts.main, {
                    baseDir: config.pwd,
                    debug: (config.target === 'dev'),
                    extensions: ['.ts', '.tsx']
                })
                .plugin(tsify, tsconfig.compilerOptions)
                .transform(babelify, {
                    presets: ['es2015', 'react']
                })
                .bundle()
                .on('error', function (error) { console.error(error.toString()); })
                .pipe(source('main.min.js'))
                .pipe(gulp.dest(config.paths.dest + '/scripts'));
    });

    gulp.task('scripts', ['scripts:bundle']);
};
