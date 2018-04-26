/**
 * @file 360导航页
 * @author kuanghongrui
 */
define(function (require, exports) {

    'use strict';

    var CallingDialog = require('common/component/CallingDialog');
    var ClickMonitor = require('common/component/ClickMonitor');
    var service = require('common/service');
    var store = require('common/store');
    var etpl = require('cobble/util/etpl');

    function fillfullCityViaProvinceId(provinceid, cityid) {
        $('.city-select').html('<option>...</option>');
        service.getRegionList({
            level: 2, // 市
            id: provinceid
        }).then(function (cities) {
            var optionsHtml = '<option value="">请选择</option>';
            for (var i = 0, j = cities.length; i < j; ++i) {
                var city = cities[i];

                optionsHtml += '<option value="' + city.id + '"' + (city.id == cityid ? ' selected' : '')
                    + '>' + city.name + '</option>';
            }
            $('.city-select').html(optionsHtml);
        });
    }

    exports.monitor = function () {
        var monitor = new ClickMonitor();
        monitor.setInterceptor(function (targetElement) {
            var data = targetElement.data();
            return {
                target: 'click_calling',
                source: 'gensx_360daohang',
                org_name: data.name,
                org_number: data.orgNumber
            };
        });
    };

    exports.init = function () {
        fillfullCityViaProvinceId(store.get('provinceid'), store.get('cityid'));
        $('.province-select').on('change', function (e) {
            var selectNode = e.currentTarget;
            var provinceid = $(selectNode.options[selectNode.selectedIndex]).val();
            fillfullCityViaProvinceId(provinceid);
        });
        $('.city-select').on('change', function (e) {
            var formElement = $('.area-form');
            if (formElement.serializeArray()[0].value) {
                formElement[0].submit();
            }
        });
        $('.org-area .calling').on('click', function (e) {
            var callingElement = $(e.currentTarget);
            new CallingDialog(callingElement.data());
        });
        exports.monitor();






        // 异步
        var container = $('.main');


        // etpl.addFilter('sub', function (title) {
        //     if (string.getLength(title) > 30) {
        //         return string.truncate(title, 46);
        //     }
        //     return title;
        // });

        // var render = etpl.compile($('#teacher-template').html());

        // 函数
        function requ(data, tag, me){

                $.ajax({
                    // url: 'http://localhost:8080/mock/navigation/360.php',
                    url: '/sogou/asy_info',
                    data: data,
                    method: 'get',
                    // dataType: 'html',
                    dataType: 'json',
                    success: function(msg){

                        // console.log(msg.data.tpl);return;

                        // var html = render({
                        //     page_content: msg
                        // });
                        // tag.html(html);

                        // console.log(me);return;
                         me.data('tpl', msg.data.tpl);

                         tag.html(msg.data.tpl);

                    }
                });
        }




        // container.delegate('.tab-item', 'mouseover', function(){
        container.find('.tab-item').hover(function(){

            var me = $(this);
            var tpl =  me.data('tpl');
            var tag = me.parentsUntil('.wrapper').find('.course-list');

            me.siblings().find('a').removeClass('tab-item-selected');
            me.find('a').addClass('tab-item-selected');

            if(tpl != ""){
                tag.html(tpl);
                return false;

            }

            // var tag = me.parent().parent().parent();
            // console.log(tag); return;


            var subject = me.data('subject');


            // return false;

            var  data = {
                    // 'page': 1,
                    'subject_id': subject
                    };

            requ(data, tag, me);


        });
















    };

});