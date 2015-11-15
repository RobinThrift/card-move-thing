
module.exports = function(gulp, config) {
    var browsersync = require('browser-sync').create();

    gulp.task('serve', ['default'], function() {
        var join = require('path').join;

        browsersync.init({
            server: {
                baseDir: join(config.cwd, config.paths.dest),
            },
            ui: {
                port: config.servers.staticPort
            },
            notify: false
        });


        var reload = browsersync.reload;

        gulp.watch(config.paths.scripts.watch, ['lint', 'scripts'])
            .on('change', reload);
        gulp.watch(config.paths.styles.watch, ['styles'])
            .on('change', reload);
        gulp.watch(config.paths.html, ['html'])
            .on('change', reload);
    });
};
