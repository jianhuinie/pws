define(function (require, exports) {
    'use strict';

    var store = require('common/store');
    var service = require('common/service');
    var eventEmitter = require('common/eventEmitter');
    var Slider = require('common/component/Slider');
    var getAdMonitorUrl = require('common/function/getAdMonitorUrl');

    require('tpl!../videoList/ad.tpl');

    var holder;
    var adId;

    //初始化轮播图
    var initCarousel = function () {
        new Slider({
            element: $('.slider-container'),
            itemSelector: '.promotion-slideritem',
            iconSelector: '.promotion-slider-navitem',
            prevSelector: '.promotion-slider-left',
            nextSelector: '.promotion-slider-right',
            duration: 3000,
            onChange: function (event, data) {
                var item = $('.promotion-slideritem[data-index="' + data.to + '"]', this.element);
                item.addClass('active');
                if (data.from >= 0) {
                    $('.promotion-slideritem[data-index="' + data.from + '"]', this.element).removeClass('active');
                }
            }
        });
    };
    //初始化广告数据
    var initADdata = function (data) {

        var adDefault = {
            material: 'http://img.gsxservice.com/0cms/d/file/content/2016/04/5714bd74ec168.jpg',
            click: 'http://ju.genshuixue.com?zn=zn_juhuixue_banner_pc ',
            monitor: '',
            clickMonitor: '',
            hover: '聚惠学'
        };

        if (!data || !data.length) {
            data = [adDefault];
        }

        // 没有物料的替换成默认的
        for (var i = data.length - 1; i >= 0; i--) {
            var tmp = data[i];
            if (!tmp.material) {
                data[i] = adDefault;
            } else if (!tmp.click){
                tmp.click = 'javascript:void(0);';
            }
        };

        var container = $('#slider-container');
        container.prepend(Simplite.render('ad-slider', data));
        initCarousel();
    };

    var imageListForMonitor = [];

    var sendToMonitor = function (url, isFirst, combined) {

        if (!url) return;

        var monitor = url.replace(/^http:\/\//, '//'); //替换为当前协议


        if (!isFirst) {
            return; //暂不重复上送
        }

        //上送统计
        if (monitor) {

            monitor = getAdMonitorUrl(monitor, true, combined);

            var img = new Image();
            // 保持引用
            var index = imageListForMonitor.push(img) - 1;

            img.onload =
            img.onerror = function () {
                // 清除引用
                img =
                img.onload =
                img.onerror = null;
                delete imageListForMonitor[index];
            };

            img.src = monitor;
        }
    }

    //绑定广告点击发送曝光
    var initAdClick = function () {
        holder
        .on('click', '.slider-container [data-click-monitor]', function (e) {

            var monitor = $(this).data('click-monitor');

            sendToMonitor(monitor, true);
            return true;
        });
    }

    var initSliderAd = function () {
        adId = holder.find('#slider-container').data('adid');
        if (!adId) {
            return;
        }
        service
        .fetchadvertisement({
            adId: adId,
            cityId: store.get('cityId')
        })
        .done(function (response){
            if (response && !response.status) {
                var data = response.data;
                if (!data) {
                    eventEmitter.emit('ad-promotion-data-fail');
                } else {
                    eventEmitter.emit('ad-promotion-data', data);
                }
            } else {
                eventEmitter.emit('ad-promotion-data-fail');
            }
        })
        .fail(function(response) {
            eventEmitter.emit('ad-promotion-data-fail');
        });
    }

    exports.init = function() {
        holder = this;

        initSliderAd();
        initAdClick();

        eventEmitter.on('ad-promotion-data', function (event, data) {
            initADdata(data[adId]);

        });
        eventEmitter.on('ad-promotion-data-fail', function () {
            initADdata();
        });

    }
});
