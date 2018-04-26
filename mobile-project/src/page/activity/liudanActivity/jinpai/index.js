/**
     @file 金牌机构宣传页
     @author wuxuelan
     @date 2017-02-20
 */

define(function(require){
    'use strict';
    var $ = require('zepto');
    var app = require('common/app');
    var env = require('util/env');
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');
    var observer = require('common/mvc/observer');
    var slideImageControl = require('common/ui/slideImageControl/slideImageControl');
    var ui = require("common/ui");
    var service = require('common/service');
    var open400TelDialog = require('common/openAppDialog/open400TelDialog');

    var container = $('.container');
    var phoneFlag = true;
    var shareConfig = {};
    var isApp;
    var height;

    // 页面类型 type  jinpai/vip
    var type;
    var typeObject = {
        jinpai: {
            id: 1,
            url: '/org/gold',
            share: {
                title: "跟谁学金牌认证机构",
                content: "让您的机构面向潜在精准学生进行广告曝光",
                img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58b39b90826cb.png',
                url: location.origin + '/org/gold'
            }
        },
        vip: {
            id: 2,
            url: '/vip/intro',
            share: {
                title: "跟谁学会员",
                content: "会员排序绝对优先，专属特权只为优秀的您",
                img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58dcc4008989f.jpeg',
                url: location.origin + '/vip/intro'
            }
        }
    };

    // 轮播初始化
    function initSlider(cContain) {
        var bullets = cContain.find(".slide_position li");
        var curimage = new slideImageControl(cContain[0], {
            auto: 3000,
            continuous: true,
            callback: lazyloadSlideImg
        });
        // 判断图片是否已经加载，并执行加载
        // 设置当前active的dot效果
        function lazyloadSlideImg(index) {
            var dom = curimage.slides[index];
            if (!dom.imageLoaded) {
                lazyLoadImage.init(dom);
                dom.imageLoaded = true;
            }
            bullets.removeClass('on');
            bullets.eq(index).addClass('on');
        }

        lazyloadSlideImg(curimage.get('index'));
    }

    // 分享
    function initShare() {
        // 初始化默认分享信息
        // var options = {
        //     title: "跟谁学金牌认证机构",
        //     content: "让您的机构面向潜在精准学生进行广告曝光",
        //     img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58b39b90826cb.png',
        //     url: location.origin + '/org/gold'
        // };
        setShare(typeObject[type].share);
    }

    //初始化form提交
    function initSubmit() {
        var formContainer = $('#form');
        formContainer.find('.submit').on('click', function () {
            var nameVal = formContainer.find('.name').val();
            var mobileVal = formContainer.find('.mobile').val();
            var cityVal = formContainer.find('.city').val();

            if (!mobileVal.length) {
                ui.remind('请输入您的联系方式');
                return;
            }
            else if (!cityVal.length) {
                ui.remind('请输入您所在的城市');
                return;
            }
            else if (!(/^\d{8,14}$/.test(mobileVal))) {
                ui.remind('请输入正确格式的联系方式');
                return;
            }
            else if (!(/^[\u4e00-\u9fa5a-zA-Z]*$/.test(cityVal.replace(/\s/g, '')))) {
                ui.remind('所在城市只能输入中文英文');
                return;
            } else if (type === 'jinpai') {
                if (!nameVal.length ) {
                    ui.remind('请输入您的机构名称');
                    return;
                } else if (!(/^[\u4e00-\u9fa5a-zA-Z0-9\-]*$/.test(nameVal.replace(/\s/g, '')))) {
                    ui.remind('机构名称只能输入中文英文数字');
                    return;
                }
            }
            var params = {
                name: nameVal,
                mobile: mobileVal,
                city: cityVal,
                type: typeObject[type].id
            };
            toSubmit(params);

        });
    }

    function toSubmit(params) {
        service.post('/org/gold_apply', params, function(res){
            if(+res.code === 0){
                //报名成功
                ui.remind('申请成功');
                location.href = typeObject[type].url;
            }
        });
    }

    //打电话
    var makePhoneCall = function(tel) {
        if (app.isApp()) {
            Jockey.send(
                'toMakePhoneCall', {
                    phone_number: tel + ''
                }
            );
        } else {
            if (env.os.isIOS) {
                location.href = 'tel:' + tel;
            } else {
                window.open('tel:' + tel);
            }
        }
    };

    //tab吸底
    var fixTab = function () {
        var footer = container.find('.footer');
        height = container.find('.header').height() - 30;

        function update() {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > height) {
                footer.addClass('footer_fixed');
            } else {
                footer.removeClass('footer_fixed');
            }
        }

        document.addEventListener('touchmove', update, false);
        $(window).scroll(update);
        setTimeout(update, 500);
    };


    return function (page_data) {
        type = page_data.type;
        lazyLoadImage.init();
        initShare();
        // 400电话的统一处理
        open400TelDialog.init();

        isApp = app.isApp();

        var adSliderCon = $('#ad-slider');
        var caseSliderCon = $('#case-slider');
        initSlider(adSliderCon);
        initSlider(caseSliderCon);
        initSubmit();
        fixTab();

        $('.free-consult').on('click', function () {
            var phoneNumber = $(this).data('tel');
            makePhoneCall(phoneNumber);
        });
        $('#form .input').on('focus', function () {
            this.scrollIntoView();
        });
    };
});