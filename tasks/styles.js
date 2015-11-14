

module.exports = function(gulp, config) {
    var join = require('path').join;

    gulp.task('styles:build', function() {
        var sass = require('gulp-sass');

        return gulp.src(config.paths.styles.main)
            .pipe(sass({
                sourceMap: (config.target === 'dev'),
                sourceMapEmbed: true
            }))
            .pipe(gulp.dest(config.paths.dest + '/styles'));
    });

    gulp.task('styles', ['styles:build']);
};
