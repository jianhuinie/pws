/**
 * @file tiku
 * @author tangrongyan
 */


define(function(require, exports) {

    'use strict';

    var AdBanner = require('./common/AdTiku');
    var AdBannerTop = require('./common/AdTikuTop');
    var store = require('common/store');

    var Popup = require('cobble/helper/Popup');
    var options = {
        show: {
            trigger: 'over',
            delay: 200,
            animation: function () {
                this.layer.slideDown(150);
            }
        },
        hide: {
            trigger: 'out',
            delay: 200,
            animation: function () {
                this.layer.slideUp(150);
            }
        }
    };
    
    
    
    exports.init = function(evtEmitter) {

        // console.log(evtEmitter);

        var query = store.get('query');

        // 初始化广告位
        new AdBannerTop({
            ele: $('.h-ad-wrappers').eq(0)
            
        });
        // 初始化广告位
        new AdBanner({
            ele: $('.ad-wrappers').eq(0),
            query: query
        });

        var container =
            exports.container = $('.crumbs');

        var isTooltipVisible = false;
        var centerPopup;
        var coursePopup;
        centerPopup = new Popup($.extend(
                {
                    element: container.find('.subject_name'),
                    layer: container.find('.subject-menu')
                },
                options
            ));
        coursePopup = new Popup($.extend(
            {
                element: container.find('.point_name'),
                layer: container.find('.point-menu'),
                onBeforeShow: function (e) {

                    var target = $(e.currentTarget);
                    var status = target.data('status');

                    if (status === 'nodata') {

                        service

                            .getCourseList()

                            .done(function (response) {
                                if (response.code === 0) {
                                    var tpl = response.data.tpl.course_list;

                                    target.find('.menu').prepend(tpl);
                                    target.data('status', 'got');

                                    Tooltip.init(
                                        container.find('.point-menu [data-title]'),
                                        {
                                            onAfterShow: function () {
                                                isTooltipVisible = true;
                                            },
                                            onAfterHide: function () {
                                                isTooltipVisible = false;
                                            }
                                        }
                                    );

                                    coursePopup.open(e);
                                }
                            });

                        return false;
                    }
                },

                onBeforeHide: function (e) {
                    if (isTooltipVisible) {
                        return false;
                    }
                }
            },
            options
        ));
    };


    if($('.middle .focus-on').text().indexOf('小学') > -1){
        $.ajax({
            type: "get",
            url:'http://pandora.genshuixue.com/generalget.advertise?id=29&cityId=-1&offset=0&source=29_1&limit=1&adPosId=141',
            data:"",
            dataType: "jsonp",
            success: function(data) {
                var src = data.data['0'].items[0].material;
                var href = data.data['0'].items[0].clickThrough;
                var str = '<a href='+ href + '><img src=' + src + '></a>';
                if ($('.banner').html() == null ) {
                    $('.banner').append(str);
                }
                else {
                    $('.banner').html(str);
                }
            },
            error: function() {
                var link = "http://pandora.genshuixue.com/ap/info.json?id=29&u=http%3A%2F%2Fwww.genshuixue.com%2Factivity%2Fmodel5%2Fall_xiaoxuesheng%3Fzn%3Dzn_cnxxs_0818_seo_pc&k=d7ROxKd8Vb530XY1WKd1nX0TnbOh08vJVKYvWgsXVKu3jK6S0SnAVUhJMIRcjKmcZQn8MQROxKscHA97ZINaHIhEtgsaHXOrHbLq0Sy8tgsanK9XZILzjbmhnbyq0gROxKyqMIRcjKmhZQnzjbmvVbOmZQRXjU9aHUhOMbmhnANrHAHhHN==";
                var str = '<a href=' + link +'><img src="http://img.gsxservice.com/18078886_1fr4g241.jpg"></a>';
                if ($('.banner').html() == null ) {
                    $('.banner').append(str);
                }
                else {
                    $('.banner').html(str);
                }
            }
        });
    }
    else if(($('.middle .focus-on').text().indexOf('初中') > -1) || ($('.ad-query').text().indexOf('中考') > -1)) {
        $.ajax({
            type: "get",
            url:'http://pandora.genshuixue.com/generalget.advertise?id=29&cityId=-1&offset=0&source=29_1&limit=1&adPosId=143',
            data:"",
            dataType: "jsonp",
            success: function(data) {
                var src = data.data['0'].items[0].material;
                var href = data.data['0'].items[0].clickThrough;
                var str = '<a href='+ href + '><img src=' + src + '></a>';
                if ($('.banner').html() == null ) {
                    $('.banner').append(str);
                }
                else {
                    $('.banner').html(str);
                }
            },
            error: function() {
                var link = "http://pandora.genshuixue.com/ap/info.json?id=29&u=http%3A%2F%2Fwww.genshuixue.com%2Factivity%2Fmodel5%2Fall_chuzhongzx%3Fzn%3Dzn_czzx_0810_seo_pc&k=d7ROxKdr070rjgnSWKD80A9TnQuO0CmwnQscWg9mVb0cVbdmjgH8HUhJMIRcjKmcZQn8MQROxKscHA91ZINaHIhEtgsaHXOrHbyq0Sy8tgsanK/vZILzjbmhnbnq0gROxKyqMIRcjKmhZQnzjbmvVbOmZQRXjU9aHUhOMbmhnANrHAHhHN==";
                var str = '<a href=' + link +'><img src="http://img.gsxservice.com/18079000_easdupv4.jpg"></a>';
                if ($('.banner').html() == null ) {
                    $('.banner').append(str);
                }
                else {
                    $('.banner').html(str);
                }
            }
        });
    }
    else if($('.middle .focus-on').text().indexOf('高中') > -1){
        $.ajax({
            type: "get",
            url:'http://pandora.genshuixue.com/generalget.advertise?id=29&cityId=-1&offset=0&source=29_1&limit=1&adPosId=145',
            data:"",
            dataType: "jsonp",
            success: function(data) {
                var src = data.data['0'].items[0].material;
                var href = data.data['0'].items[0].clickThrough;
                var str = '<a href='+ href + '><img src=' + src + '></a>';
                if ($('.banner').html() == null ) {
                    $('.banner').append(str);
                }
                else {
                    $('.banner').html(str);
                }
            },
            error: function() {
                var link = "http://pandora.genshuixue.com/ap/info.json?id=29&u=http%3A%2F%2Fwww.genshuixue.com%2Factivity%2Fmodel5%2Fall_gaopintupo%3Fzn%3Dzn_gptp_0818_seo_pc&k=d7ROxg6SHbsmnb3AWgyAHgsTnbLAjkv3nK9XWK0rnbHwjbshH7jSVIhJMIRcjKmcZQn8MQROxKscHA/8ZINaHIhEtgsaHXOrHbjq0Sy8tgsanKH1ZILzjbmhnbuq0gROxKyqMIRcjKmhZQnzjbmvVbOmZQRXjU9aHUhOMbmhnANrHAHhHN==";
                var str = '<a href=' + link +'><img src="http://img.gsxservice.com/18079191_j3lw0hmn.jpg"></a>';
                if ($('.banner').html() == null ) {
                    $('.banner').append(str);
                }
                else {
                    $('.banner').html(str);
                }
            }
        });
    }
    else {
        $('.banner').css('display', 'none');
    }



});
