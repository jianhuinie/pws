require.config({
    baseUrl: "./src",
    paths: {
        
    },
    shim: {
        
    },
    //packages用于从commonJS里加载模块s
    packages: [
        {
            name: 'cc',
            location: '../dep/cc/1.1.1/src',
            main: 'main'
        }
    ],
});
define(function (require, exports) {
    var mainPage = require('mainPage');
    mainPage.init();
});
