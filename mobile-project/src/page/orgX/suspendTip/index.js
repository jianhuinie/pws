define(function(require) {

    'use strict';

    var app = require('common/app');
    var Jockey = require('jockey');
    var lazyLoadImage = require('common/lazyLoadImage');

    return function(page_data) {


        var heightUnderNav = screen.availHeight - $('#page_nav_bar').height();
        $('.img-wrapper').css('height', heightUnderNav).removeClass('hidden');
        // $('.tip').css('top', heightUnderNav * .45);
        Jockey.send('setPageTitle', {
            title: '停课通知'
        });
        Jockey.send('setTitleBar', {
            display: true
        });

        lazyLoadImage.init();

    };

});