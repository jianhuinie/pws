/**
 * @file 搜索列表页模块
 * @author wuhongjie
 */
define(function (require, exports) {

    'use strict';

    var VideoDialog = require('common/component/VideoDialog');
    var cookie = require('cobble/util/cookie');
    var store = require('common/store');
    var Slider = require('common/component/Slider');

    /*
     * 初始化幻灯 - 其他城市全国名师推荐
     *
     * @param {element} container 幻灯容器
     */
    function sliderSecondCommon(container) {
        var leftIcon = container.find('.icon-chevron-left');
        var rigthIcon = container.find('.icon-chevron-right');

        var len = container.find('.slider-li').length;

        new Slider({
            element: container,
            itemSelector: '.slider-li',
            iconSelector: '.button-item',
            prevSelector: '.icon-chevron-left',
            nextSelector: '.icon-chevron-right',
            click: 'click',
            duration: 50,
            autoPlay: false,
            delay: 3000,
            onChange: function (e, data) {
                /*
                var from = data.form;
                var to = data.to;
                if (to == 0) {
                    leftIcon.addClass('disable');
                    rigthIcon.removeClass('disable');
                }
                else if (to == len - 1) {
                    rigthIcon.addClass('disable');
                    leftIcon.removeClass('disable');
                }
                else {
                    leftIcon.removeClass('disable');
                    rigthIcon.removeClass('disable');
                }
                */
            }
        });
    };

    exports.init = function () {

        var container = $("#search-list");

        // 其他城市全国名师推荐（多于3项时）
        var moreamousContaint = container.find('.more-famous');
        sliderSecondCommon(moreamousContaint);

        //城市英雄二期
        var anotherFamousContainer = container.find('.another-famous');
        sliderSecondCommon(anotherFamousContainer);

        container
        .on('click', '.video' , function (e) {

            var element = $(this);
            var title = element.data('name');

            new VideoDialog({
                url: element.data('video'),
                title: title
            });
        })

        .on('click', '[log]', function (e) {
            var element = $(this);
            var url = 'http://click.genshuixue.com/w.gif';
            var log = element.attr('log');
            var temp = log.split(",");
            var rank = temp[0];
            var tid = temp[1];
            var qid = temp[2];
            var crank = element.data("crank");
            var itemId = element.data("number");
            var location = temp[3];
            var uid = cookie.get('__track_id__');
            var time = (new Date()).getTime();
            var uuid = store.get('user').id ? store.get('user').id : -1;
            var resType = element.data('restype');
            var params = {
                q: store.get('condition').q,
                type: 'search',
                stype: 'teacher',
                rank: rank,
                tid: tid,
                item_id: itemId ? itemId : tid,
                qid: qid,
                location: location,
                uid: uid,
                c_rank: crank ? crank : 0,
                user_id: uuid,
                t: time,
                ad_res_type: resType
            } ;
            WAT.send(url,params);
        })

        .on('click','.controller-more-course .see-more',function(event){
            $(this).hide();
            $(this).parent().find('.close-more').show();
            $(this).parent().parent().parent().find('.course-item-list').find('.hide-start').addClass('show-start');
        })

        .on('click','.controller-more-course .close-more',function(event){
            $(this).hide();
            $(this).parent().find('.see-more').show();
            $(this).parent().parent().parent().find('.course-item-list').find('.hide-start').removeClass('show-start');
        });

    };
});