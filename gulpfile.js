
var gulp       = require('gulp'),
    forEach    = require('lodash.foreach'),
    requireDir = require('require-dir'),
    config     = {
        cwd: __dirname,
        target: 'dev',
        paths: {
            html: 'src/index.html',
            scripts: {
                main: 'src/scripts/app.js',
                watch: ['src/scripts/**/*', 'src/scripts/*']
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
