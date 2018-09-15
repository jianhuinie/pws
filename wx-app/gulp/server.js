
var gulp = require('gulp');
var Hapi = require('hapi');
var path = require('path');

var mockServer = require('./mockServer');

gulp.task('server:start', function () {
    var server = new Hapi.Server();
    server.connection({
        port: 8208,
        host:'127.0.0.1'
    });
    server.start(function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Server Started at', server.info.uri);
    });
    server.route({
        method: 'POST',
        path: '/{path*}',
        handler: function (request, reply) {
            mockServer(request, reply);
        }
    });

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: function (request, reply) {
            mockServer(request, reply);
        }
    });
});