/**
     @file liudan
     @author wuxuelan
     @date 2016-02-28
 */

define(function(require){
    'use strict';
    var $ = require('zepto');
    var app = require('common/app');
    var env = require('util/env');
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');
    var slideImageControl = require('common/ui/slideImageControl/slideImageControl');
    var ui = require("common/ui");
    var service = require('common/service');
    var habo = require('common/component/analysis/habo/index');
    var urlUtil = require('util/url_v2');

    var container = $('.container');
    var searchInput = container.find('input[name="subject-search"]');
    var searchUl = container.find('.search-suggestion');
    var mask = container.find('.mask-container');
    var isApp;
    var height;
    var subjectList;

    // 分享
    function initShare() {
        // 初始化默认分享信息
        var options = {
            title: "跟谁学－全球领先的找好老师学习服务平台",
            content: "60万认证名师，8000万学生家长使用推荐，帮您找到最适合的好老师！",
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58b679dc744c9.jpg',
            url: location.origin + '/liudan/index'
        };
        setShare(options);
    }

    //初始化form提交
    function initSubmit() {
        var query = urlUtil.parseQuery(location.search);
        var from = '';
        if (query.from) {
            from = query.from;
        }

        var formContainer = $('#form');
        formContainer.find('.submit').on('click', function () {
            var nameVal = formContainer.find('.name').val();
            var mobileVal = formContainer.find('.number').val();
            var courseVal = formContainer.find('.subject').val();

            if (!nameVal.length) {
                ui.remind('请输入您的姓名');
                return;
            }
            else if (!courseVal.length) {
                ui.remind('请输入您想学习的科目');
                return;
            }
            else if (!mobileVal.length) {
                ui.remind('请输入您的手机号码');
                return;
            }
            else if (!(/^[\u4e00-\u9fa5a-zA-Z0-9]*$/.test(nameVal.replace(/\s/g, '')))) {
                ui.remind('姓名只能输入中文英文数字');
                return;
            }
            else if (!(/^1\d{10}$/.test(mobileVal))) {
                ui.remind('请输入正确格式的手机号码');
                return;
            }
            else if (!(/^[\u4e00-\u9fa5a-zA-Z\-]*$/.test(courseVal.replace(/\s/g, '')))) {
                ui.remind('科目只能输入中文英文');
                return;
            }
            var params = {
                user_name: nameVal,
                course_name: courseVal,
                mobile: mobileVal,
                from: from,
                source: query.source
            };
            toSubmit(params);
        });
    }

    function toSubmit(params) {
        service.post('/liudan/submit', params, function(res){
            if(res.code == "0"){
                //报名成功
                mask.show();
                //location.href = '/liudan/index';
            }
        });
    }

    //打电话
    var makePhoneCall = function(tel) {
        if (app.isApp()) {
            Jockey.send(
                'toMakePhoneCall', {
                    phone_number: tel
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
        height = container.find('.liudan-header').height() - 30;

        function update() {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > height) {
                footer.addClass('fixed-footer');
            } else {
                footer.removeClass('fixed-footer');
            }
        }

        document.addEventListener('touchmove', update, false);
        $(window).scroll(update);
        setTimeout(update, 500);
    };

    // search
    function updateSearchSuggestion(subjectList) {
        var lis = [];
        subjectList.forEach(function (value) {
            lis.push('<li class="subject-li">' + value.remark_name + '</li>');
        });
        searchUl.html(lis.join(''));
        searchUl.show();
    }

    function searchInit(){
        searchInput.on('input', function () {
            var me = $(this);
            var value = me.val();
            var params = {
                keyword: value
            };
            service.post('/seek_teacher/subjectRecommend', params, function(res){
                if(res.code == "0"){
                    subjectList = res.data;
                    updateSearchSuggestion(subjectList);
                }
            });
        });
    }

    return function () {
        lazyLoadImage.init();
        initShare();
        isApp = app.isApp();
        fixTab();
        initSubmit();
        searchInit();
        // click的统一上报处理
        habo.initClick();

        container.find('.consult').on('click', function () {
            var phoneNumber = $(this).data('tel');
            makePhoneCall(phoneNumber);
        });

        container.find('.ic-play').on('click', function () {
            container.find('.video-back').hide();
            container.find('.iframe-box').show();
            
            try {
                document.domain = 'genshuixue.com';
                $('#video-iframe')[0].contentWindow.document.getElementById('video').play();
            } catch (e) {
                // 避免跨域
                console.log(e);
            }
        });

        container.find('.icon-close').on('click', function () {
            mask.hide();
        });

        container.on('click', '.subject-li', function (e) {
            var me = $(this);
            searchInput.val(me.text());
            searchUl.hide();
        });

        container.on('click', function (e) {
            //console.log(e.target.getAttribute('class'));
            var className = e.target.getAttribute('class') || '';
            if (className != 'subject-li') {
                searchUl.hide();
            }
        });
    };
});