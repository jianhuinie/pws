/**
 * @file 搜狗导航页-切换城市
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var container = $('#head');
    var store = require('common/store');
    var RegionSelect = require('common/component/RegionSelect');
    var cityId = 0;

    exports.init = function () {

        var select = container.find('.city-select');

        var citySelect = new RegionSelect({
            element: select,
            provinceText: '请选择',
            cityText: '请选择',
            onCityChange: function (data) {

                if(data.value) {
                    cityId = data.value;
                    //cityName = data.text;
                }
            }
        });

        container
        .on('click', '.city-trigger', function(e){
            container.find('.citys').hide();
            container.find('.city-select').show();
        })
        .on('click', '.btn-cancel', function(e){
            container.find('.city-select').hide();
            container.find('.citys').show();
        })
        .on('click', '.btn-comfirm', function(e){
            var url = '/sogou/index';
            var page_type = store.get('page_type');
            var source = '';
            if (page_type == 'ytxq') {
                url = '/sogou/artInterest';
                if (store.get('site') == 'qq') {
                    source = '&source=gsx_qqdh_yt';
                } else {
                    source = '&source=gsx_sogoudh_yt';
                }
            } else if (page_type == 'zxx') {
                url = '/sogou/midPreSchool';
                if (store.get('site') == 'qq') {
                    source = '&source=gsx_qqdh_k12';
                } else {
                    source = '&source=gsx_sogoudh_k12';
                }
            } else if (page_type == 'cglx') {
                url = '/sogou/studyAbroad';
                if (store.get('site') == 'qq') {
                    source = '&source=gsx_qqdh_lx';
                } else {
                    source = '&source=gsx_sogoudh_lx';
                }
            } else {
                if (store.get('site') == 'qq') {
                    source = '&source=gsx_qqdh_pc';
                } else {
                    source = '&source=gsx_sogoudh_pc';
                }
            }

            if (cityId) {
                if (store.get('site') == 'qq') {
                    location.href = url + '?site=qq&city='+cityId+source;
                } else {
                    location.href = url + '?city='+cityId+source;
                }
            }
        })

    };

});