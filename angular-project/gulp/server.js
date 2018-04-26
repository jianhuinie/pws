

var gulp = require('gulp');
var Hapi = require('hapi');
var through = require('through2');
var Inert = require('inert');
var path = require('path');
var vinylfs = require('vinyl-fs');
var mapstream = require('map-stream');


// var gulpSass = require('gulp-sass');
var gulpLess = require('gulp-less');
var gulpBrowserify = require('gulp-browserify');
var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');



// var mockConfig = require('../mock/mock');
var mockServer = require('./mockServer');

var minifyOpts  = {
    spare: true,
    empty: true,
    quotes: true,
    comments: true,
    collapseWhitespace: true,
    removeTagWhitespace: true,
    processScripts: ['text/template']
};

gulp.task('server:start',  function () {

    var server = new Hapi.Server();
    server.register(Inert, function () {});
    server.connection({
        port: 8108,
        host:'0.0.0.0'
    });

    // mockConfig.initServer(server);

    server.route({
        method: 'POST',
        path: '/app/resource/css/{name}.css',
        handler: function (request, reply) {
             gulp.src('app/resource/css/' + request.params.name  + '.less')
                .pipe(gulpLess())
                .pipe(autoprefixer({
                    browsers: ['last 2 versions']
                }))
                .pipe(through.obj(
                    function (file, cb) {
                        reply(file.contents.toString())
                            .type('text/css');
                    },
                    function (cb) {
                        cb();
                    }
                ));
        }
    });

    server.route({
        method: 'GET',
        path: '/app/resource/css/{name}.css',
        handler: function (request, reply) {
             gulp.src('app/resource/css/' + request.params.name  + '.less')
                .pipe(gulpLess())
                .pipe(autoprefixer({
                    browsers: ['last 2 versions']
                }))
                .pipe(through.obj(
                    function (file, cb) {
                        reply(file.contents.toString())
                            .type('text/css');
                    },
                    function (cb) {
                        cb();
                    }
                ));
        }
    });

    server.route({
        method: 'GET',
        path: '/{path}/{name}.html',
        handler: function (request, reply) {

            var params = request.params;
            gulp.src(params.path + '/' + params.name + '.html')
                .pipe(through.obj(
                    function (file, obj) {
                        reply(file.contents.toString().replace('angular.min.js', 'angular.js'))
                            .type('text/html');
                    },
                    function (cb) {
                        cb();
                    }
                ));
        }
    });

    // server.route({
    //     method: 'POST',
    //     path: '/{path}/{name}.do',
    //     handler: function (request, reply) {
    //         mockServer(request, reply);
    //         // var params = request.params;
    //         // gulp.src(params.path + '/' + params.name + '.html')
    //         //     .pipe(through.obj(
    //         //         function (file, obj) {
    //         //             reply(file.contents.toString().replace('angular.min.js', 'angular.js'))
    //         //                 .type('text/html');
    //         //         },
    //         //         function (cb) {
    //         //             cb();
    //         //         }
    //         //     ));
    //     }
    // });

    // server.route({
    //     method: 'POST',
    //     path: '/{path}/{path2}/{name}.do',
    //     handler: function (request, reply) {
    //         mockServer(request, reply);
    //         // var params = request.params;
    //         // gulp.src(params.path + '/' + params.name + '.html')
    //         //     .pipe(through.obj(
    //         //         function (file, obj) {
    //         //             reply(file.contents.toString().replace('angular.min.js', 'angular.js'))
    //         //                 .type('text/html');
    //         //         },
    //         //         function (cb) {
    //         //             cb();
    //         //         }
    //         //     ));
    //     }
    // });

    server.route({
        method: 'GET',
        path: '/app/module/{name}/templates.js',
        handler: function (request, reply) {
            var name = request.params.name;
            var templateArr = [
                'app/common/**/*.html',
                'app/module/' + name + '/**/*.html'
            ];

            // if (name === 'master') {
            //     templateArr.push('app/module/main/cash/**/*.html');
            //     templateArr.push('app/module/main/account/**/*.html');
            // }
            
            console.log(templateArr);
            gulp.src(templateArr)
                .pipe(templateCache({
                    base: '../',
                    transformUrl: function (url) {

                        var currentPath = path.join(__dirname, '..', '..');
                        return url.replace(currentPath + '/', '');
                    }
                }))
                .pipe(through.obj(
                    function (file, cb) {

                        reply(file.contents.toString())
                            .type('text/javascript');
                    },
                    function (cb) {
                        console.error('error occured');
                        cb();
                    }
                ))
                .on('data', function(e) {
                    console.log(data);
                })
                .on('error', function() {
                    console.log('error');
                });

        }
    });

    server.route({
        method: 'GET',
        path: '/app/css/fonts/{path*}',
        handler: {
            directory: {
                path: 'dep/icomoon/0.1.5/fonts'
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/{path*}',
        handler: function (request, reply) {
            mockServer(request, reply);
            // var params = request.params;
            // gulp.src(params.path + '/' + params.name + '.html')
            //     .pipe(through.obj(
            //         function (file, obj) {
            //             reply(file.contents.toString().replace('angular.min.js', 'angular.js'))
            //                 .type('text/html');
            //         },
            //         function (cb) {
            //             cb();
            //         }
            //     ));
        }
    });

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: {
                path: './',
                listing: true
            } 
        }
    });
    
    server.route({
        method: 'GET',
        path: '/api/{path*}',
        handler: function (request, reply) {
            mockServer(request, reply);
        }
    });
    
    server.start(function (e) {

        if (e) {
            console.log(e);
        }
        console.log('Server Started at', server.info.uri);
    });

});

gulp.task('server:built', function () {
    var server = new Hapi.Server();
    server.register(Inert, function () {});
    server.connection({
        port: 8108,
        host:'0.0.0.0'
    });

    // mockConfig.initServer(server);

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: {
                path: 'output',
                listing: true
            }
        }
    });
    
    

    server.start(function (e) {
        console.log('Server Started at', server.info.uri);
    });

});

gulp.task('testAngular', function() {
    return gulp.src('app/main/**/*.html')
        .pipe(templateCache())
        .on('error', function(e)  {
            console.log(e);
        })
        .pipe(through.obj(function(file, cb) {
            console.log(file.contents.toString());
        }))
        
})
