
module.exports = function(gulp, config) {
    var eslint = require('gulp-eslint');
    var join = require('path').join;
    gulp.task('lint', function() {
        return gulp.src(config.paths.scripts.watch)
            .pipe(eslint({
                configFile: join(config.cwd, '.eslintrc')
            }))
            .pipe(eslint.formatEach('stylish'));
    });
}
