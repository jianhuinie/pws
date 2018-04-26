var less = require('less');
var fs = require('fs');
var path = require('path');

exports.register = function (plugin, options, next) {
    var route = options.route || '/styles/{filename*}';
    var home = path.normalize(options.home);

    plugin.route([
        {
            method: 'GET',
            path: route,
            handler: function (request, reply) {
                var filename = path.normalize(home + '/' + request.params.filename);
                fs.exists(filename, function (exists) {
                    if (exists) {
                        reply.file(filename);
                    } else {
                        filename = filename.replace(/\.css$/, '.less');

                        fs.exists(filename, function (exists) {
                            if (exists) {
                                fs.readFile(filename, {encoding: 'utf8'}, function (err, data) {
                                    if (err) {
                                        request.log(['hapi-less', 'error'], err);
                                        return reply(err);
                                    }
                                    var parser = new less.Parser({
                                        paths: [home]
                                    });

                                    parser.parse(data, function (err, tree) {
                                        if (err) {
                                            request.log(['hapi-less', 'error'], err);
                                            return reply(err);
                                        }

                                        reply(tree.toCSS(options.less)).type('text/css');
                                    });
                                });
                            } else {
                                reply().code(404);
                            }
                        });
                    }
                });
            }
        }
    ]);

    return next();
};

exports.register.attributes = {
    multiple: true,
    pkg: require('./package.json')
};