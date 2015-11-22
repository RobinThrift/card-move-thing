
var gulp       = require('gulp'),
    forEach    = require('lodash.foreach'),
    requireDir = require('require-dir'),
    config     = {
        cwd: __dirname,
        target: require('process').env.NODE_ENV != 'production' ? 'dev' : 'production',
        paths: {
            html: 'src/index.html',
            scripts: {
                main: 'src/scripts/app.tsx',
                watch: ['src/scripts/**/*.ts', 'src/scripts/*.ts', 'src/scripts/**/*.tsx', 'src/scripts/*.tsx']
            },
            styles: {
                main: 'src/styles/main.scss',
                watch: ['src/styles/**/*']
            },
            dest: 'dist'
        },
        servers: {
            staticPort: 8080
        }
    };

forEach(requireDir('./tasks'), function(task) {
    task(gulp, config);
});

gulp.task('default', ['html', 'styles', 'scripts', 'lint']);
gulp.task('dist', ['html', 'styles', 'scripts']);
