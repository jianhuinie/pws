/**
 * Created by bjhl on 16/3/24.
 */
define(function(require){

    'use strict';

    var lazyLoadImage = require('common/lazyLoadImage');

    var user = require('common/user');
    var app = require('common/app');
    var isApp;

    var openAppWindow = require("common/openAppWindow");
    var share = require("../_part/pageShare/init");

    return function(){
        //分享
        share.init();

        lazyLoadImage.init();

        openAppWindow.init();

        //isApp = app.isApp();
        //$('.resume').on('click', function () {
        //    var me = $(this);
        //    var link = me.data('href');
        //    if(isApp) {
        //        user.loginStudent();
        //    }
        //    else {
        //        location.href = link;
        //    }
        //});
        //$('.center').on('click',function() {
        //    var me = $(this);
        //
        //    var link = me.find('a').data('href');
        //    if(isApp) {
        //        user.loginStudent();
        //    }
        //    else {
        //        location.href = link;
        //    }
        //});
    }
});