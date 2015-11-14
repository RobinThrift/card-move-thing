
module.exports = function(gulp, config) {
    var browsersync = require('browser-sync').create();

    gulp.task('watch', function() {
        var reload = browsersync.reload;

        gulp.watch(config.paths.scripts.watch, ['scripts:bundle'])
            .on('change', reload);
        gulp.watch(config.paths.styles + '/**/*', ['scripts:build'])
            .on('change', reload);
        gulp.watch(config.paths.html, ['html:copy'])
            .on('change', reload);
    });

    gulp.task('server:static', ['watch'], function() {
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
    });
};
