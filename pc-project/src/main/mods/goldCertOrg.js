/**
 * @file  金牌认证轮播图
 * @author  niejianhui
 */
define(function (require, exports) {

    var Slider = require('common/component/Slider');
    var store = require('common/store');
    
    exports.init = function (pageType) {
        
        /**
         * 初始化金牌认证机构轮播图
         */
        var container = $('.gold-cert-org');
        new Slider({
            element: container,
            itemSelector: '.org-item',
            iconSelector: '.button-item',
            duration: 150,
            delay: 4000,
            activeClass: 'active',
            autoPlay: true,
            pauseOnHover: true,
            trigger: 'click'
        });

        //点击上报
        container
            .on('click', '.org-item', function (e) {
                var target = $(e.currentTarget);
                var url = 'http://pb0.genshuixue.com/gs.gif';
                var params = {
                    type: 'pc_' + pageType + '_index1',
                    stype: 'jinpaijigou_click',
                    org_number: target.data('orgnumber'),
                    city_id: target.data('cityid'),
                    user_id: store.get('user').number
                };
                WAT.send(url, params);
            })
    }
});
