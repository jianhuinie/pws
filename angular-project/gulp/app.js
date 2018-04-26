
var gulp = require('gulp');

require('./app/html');
require('./app/css');
require('./app/template');
require('./app/amd');
require('./app/swig');
require('./app/js');
require('./app/cdn');
require('./app/jshint');


gulp.task('app', ['app.js']);
