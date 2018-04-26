/**
 * @file 老师个人中心会员中心
 * @author wuhongjie
 */
define(function (require, exports) {


    'use strict';
    var renderImage = require('userCenter/common/function/renderImage');

    exports.init = function (data) {
        var name = userData.displayName.length < 10 ? userData.displayName : userData.displayName.substr(0,10)+'...';
        new Ractive({
            el: '#main .wrapper',
            template: require('html!./index.html'),
            data:{
                is_vip : userData.vip_level == 0 ? false : true,
                date : data.date,
                cdate : data.cdate,
                gdate : data.gdate,
                name : name,
                avatar : userData.avatar,
                level : userData.vip_level,
                url : userData.privateDomain
            },
            change : function(event){
                var element = $(event.node);
                $('.level-link').removeClass('active');
                element.addClass('active');
                $('.vip-center').hide();
                $('.'+element.attr('data-target')+'-center').show();
            },
            onrender : function(){
                renderImage($('.vip-header'));
            }
        });
    };

});
