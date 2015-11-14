
module.exports = function(gulp, config) {
    gulp.task('html:copy', function() {
        return gulp.src(config.paths.html)
            .pipe(gulp.dest(config.paths.dest));
    });

    gulp.task('html', ['html:copy']);
};
