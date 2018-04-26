
var CleanCSS = require('clean-css');
var cleanCSS = new CleanCSS();

var autoprefixer = require('autoprefixer');
var postcss = require('postcss');

var config = require('../config');

exports.extnames = [
    '.css'
];

exports.is = function (node) {
    return exports.extnames.indexOf(node.extname) >= 0;
};

exports.build = function (node) {
    return new Promise(function (resolve, reject) {
        exports.autoprefixer(
            node.content.toString()
        )
        .then(function (css) {
            if (config.release) {
                cleanCSS.minify(css, function (error, output) {
                    if (error) {
                        console.error(error);
                    }
                    node.content = config.replaceContent(output.styles, 'css');
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    });
};

exports.autoprefixer = function (css) {

    var instance = autoprefixer({
        browsers: [
            '> 0%',
            'last 10 version'
        ]
    });

    return new Promise(function (resove) {
        postcss([ instance ]).process(css).then(
            function (result) {
                result.warnings().forEach(
                    function (warning) {
                        console.warn(warning.toString());
                    }
                );
                resove(result.css);
            }
        );
    });

};

