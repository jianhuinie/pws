
/**
 * @fileOverview  合并require模块
 * @author peilonghui
 */

var gulp = require('gulp');
var rjs = require('requirejs');
var helper = require('../helper');
var constants = require('./constants');


var apply = helper.apply;

var amdOptions = {
    'baseUrl': 'app/',
    // optimize: 'uglify2',
    optimize: 'none',
    // waitSeconds: 20,
    paths: {
        'ui-router': '../dep/angular-ui-router/release/angular-ui-router.min',
        'BaiduMap': 'http://api.map.baidu.com/api?v=2.0&ak=eeEx8F2dCVi5VNb1D1LyxEDo',
        bindonce: '../dep/angular-bindonce/bindonce.min',
        moment: '../dep/moment/moment',
        underscore: '../dep/underscore/underscore',
        'ng-sanitize': '../dep/angular-sanitize/angular-sanitize.min',
        'cc': '../dep/cc/1.1.1/src',
        'cc-config': '../dep/cc/1.1.1/custom',
        umeditor: '../dep/umeditor/umeditor.v1.min',
        'umeditor.config': '../dep/umeditor/umeditor.config'
    },
    shim: {
        'ui-router': {
            exports: 'angular'
        },
        'bindonce': {
            exports: 'angular'
        },
        'ng-sanitize': {
            exports: 'angular'
        },
        'umeditor': {
            exports: 'UM'
        },
        'umeditor.config': {
            exports: 'UMEDITOR_CONFIG'
        }
    },
    exclude: [
        'underscore',
        'ui-router',
        'umeditor',
        'ng-sanitize',
        'bindonce'
    ]
};

function amdHandler(cb) {
    var len = 0;
    amdOptions.onModuleBundleComplete = function (data) {
        console.log('amd optimize file done:' + data.name);
        len++;
        if (len === constants.MODULE_NAMES.length) {
            console.log('amd optimize ' + len + ' files all done!');
            cb();
        }
    };

    //主流程
    var mainOptions = apply(
        {
            name: 'module/main/app',
            out: 'b-fe-compiled/asset/module/main/app.js'
        },
        amdOptions
    );
    rjs.optimize(mainOptions);

    //通用无顶导
    var commonPageOptions = apply(
        {
            name: 'module/commonPage/app',
            out: 'b-fe-compiled/asset/module/commonPage/app.js'
        },
        amdOptions
    );
    rjs.optimize(commonPageOptions);

    //通用无顶导
    var commonPageOptions = apply(
        {
            name: 'module/detail/app',
            out: 'b-fe-compiled/asset/module/detail/app.js'
        },
        amdOptions
    );
    rjs.optimize(commonPageOptions);
}

gulp.task('app.amd', ['app.template'], function (cb) {
    amdHandler(cb);
});

gulp.task('app.amd.uglify', ['app.template'], function (cb) {
    amdOptions.optimize = 'uglify2';
    amdHandler(cb);
});