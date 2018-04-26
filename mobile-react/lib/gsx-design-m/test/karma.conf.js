/**
 * @fileOverview Karma configuration
 * @author XiaoBin li
 */

module.exports = function(config) {
    config.set({

        basePath: '../',

        frameworks: ['jasmine', 'requirejs'],

        files: [
            {
                pattern: 'dep/requirejs/require.js',
                included: false
            },
            {
                pattern: 'src/util/**/*.js',
                included: false
            },
            {
                pattern: 'src/function/*.js',
                included: false
            },
            {
                pattern: 'src/ngService/**/*.js',
                included: false
            },
            {
                pattern: 'src/ngDirective/**/*.js',
                included: false
            },
            {
                pattern: 'src/ngFilter/*.js',
                included: false
            },
            {
                pattern: 'test/unit/util/**/*.js',
                included: false
            }, 
            {
                pattern: 'test/unit/ngService/**/*.js',
                included: false
            }, 
            {
                pattern: 'test/unit/function/*.js',
                included: false
            }, 
            {
                pattern: 'test/unit/ngDirective/**/*.js',
                included: false
            }, 
            {
                pattern: 'dep/angular/angular.js',
                included: true
            }, 
            {
                pattern: 'dep/angular-mocks/angular-mocks.js',
                included: true
            },
            'test/unit/main.js',
            'dep/jquery/dist/jquery.js'
        ],

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        reporters: ['progress', 'coverage'],

        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // web server port
        port: 9879,

        preprocessors: {
            'test/unit/**/*.js': ['coverage']
        },

        plugins: [
            'karma-jasmine',
            'karma-requirejs',
            'karma-chrome-launcher',
            'karma-coverage'
        ],
        coverageReporter: {
            type: 'html',
            dir: './test/unit/coverage/'
        }
    });
};