
module.exports = function(gulp, config) {
    var tslint = require('gulp-tslint');
    var join = require('path').join;
    var stylish = require('gulp-tslint-stylish');
    var tslintconfig;
    try {
        tslintconfig = require(join(config.cwd, 'tslint.json'));
    } catch (e) {
        console.log(`Can't find tslint.json at ${config.cwd}`)
    }
    gulp.task('lint', function() {
        return gulp.src(config.paths.scripts.watch)
            .pipe(tslint({
                configuration: tslintconfig
            }))
            .pipe(tslint.report(stylish));
    });
}
