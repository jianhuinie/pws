/**
 * @file 机构详情
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var base = require('./common/base');
    // var baiduMap = require('common/map/baiduAddr');
    var VideoDialog = require('common/component/VideoDialog');
    var ImageDialog = require('common/component/ImageDialog');
    var LoginDialog = require('common/component/LoginDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var compressImage = require('common/function/compressImage');
    var tianxiaoLog = require('common/tianxiaoLog');
    var courseMap = require('common/map/baidu');
    var Dialog = require('cobble/ui/Dialog');
    var store = require('common/store');
    var service = require('common/service');
    var Select = require('cobble/form/Select');
    var form = require('common/form');
    var Slider = require('common/component/Slider');

    var Carousel = require('cobble/ui/Carousel');

    var orgNav = $(".org-nav");
    var video = $('.video');
    var photo = $('.photo');
    var comment = $('.main-comment');
    var course = $('.course');
    var orgComment = $('#org-comment');
    var selectChoices = $('.select-choices');
    var coupon = $('.coupon');
    var noticeTip = $('.notice-tip');
    var mapHash = {};
    var carouselOrg = $('.org-carousel');
    var params = {
        pageSize: 10,
        orgId: '',
        orgNumber: '',
        faceType: 0,
        page: 1,
        type: 0,
        subject: 0,
        sortby: 'display_order'
    };

    var typeOptions = [
        {
            text: '全部类型',
            value: 0
        },
        {
            text: '视频课',
            value: 4
        },
        {
            text: '班课',
            value: 3
        },
        {
            text: '一对一',
            value: 1
        },
        {
            text: '机构一对一',
            value: 11
        },
        {
            text: '机构班课',
            value: 12
        },
        {
            text: '邀请评价',
            value: 2
        }
    ];

    var sortbyOptions = [
        {
            text: '推荐排序',
            value: 'display_order'
        },
        {
            text: '最近评价',
            value: 'create_time'
        }
    ];

    var subjectOptions = [];
    subjectOptions.push({
        text: '全部类目',
        value: '0'
    });

    function dateFormat(time) {
        //console.log(time);
        var day = 0;
        var hour = 0;
        var minute = 0;
        var second = 0;

        // 天 24*3600
        if (time > 86400) {
            day = Math.floor(time / 86400);
        }
        time %= 86400;

        if (time > 3600) {
            hour = Math.floor(time / 3600);
        }
        time %= 3600;

        if (time > 60) {
            minute = Math.floor(time / 60);
        }
        second = time % 60;

        var time_txt = (day > 9 ? day : '0' + day ) + '天' +
                       (hour > 9 ? hour : '0' + hour) + '时'+
                       (minute > 9 ? minute : '0' + minute) +'分' +
                       (second > 9 ? second : '0' + second) + '秒';

                       /*
        console.log('day'+day);
        console.log('hour'+hour);
        console.log('minute'+minute);
        console.log('sceond'+second);*/
        return time_txt;
    }

    function getOrgCommentList(data) {
        return service
        .getOrgCommentList(data)
        .done(function (response) {
            if (response.code === 0) {
                var data = response.data;
                var tpl = data.tpl;
                orgComment.find('.tab-nav').html(tpl.comment_nav);
                orgComment.find('.nav-content').html(tpl.comment_list);
            }
        });
    }

    exports.init = function () {

        base.init();
        params.orgId = store.get('orgId');
        params.orgNumber = store.get('orgnumber');
        getOrgCommentList(params);

        var subjectSelect = new Select({
            element: selectChoices.find('.subject'),
            name: 'subject',
            onChange: function (e, data) {
                if (data.value != params.subject) {
                    params.subject = data.value;
                    params.page = 1;
                    getOrgCommentList(params);
                }
            }
        });

        service
        .getOrgSubjectList(
        {
            orgNumber: store.get('orgnumber')
        })
        .done(function (response) {
            if(response.code == 0) {
                var data = response.data.subjects;
                $.each(data, function (index, item) {
                    subjectOptions.push({
                        text: item.name,
                        value: item.id
                    });
                });
                //异步获取下拉菜单  更新
                subjectSelect.refresh({
                    data: subjectOptions,
                    value: '0'
                });
            }
        });

        var typeSelect = new Select({
            element: selectChoices.find('.type'),
            name: 'type',
            onChange: function (e, data) {
                if (data.value != params.type) {
                    params.type = data.value;
                    params.page = 1;
                    getOrgCommentList(params);
                }
            }
        });
        typeSelect.refresh({
            data: typeOptions,
            value: '0'
        });

        var sortbySelect = new Select({
            element: selectChoices.find('.sortby'),
            name: 'sortby',
            onChange: function (e, data) {
                if (data.value != params.sortby) {
                    params.sortby = data.value;
                    params.page = 1;
                    getOrgCommentList(params);
                }
            }
        });
        sortbySelect.refresh({
            data: sortbyOptions,
            value: 'display_order'
        });

        // 获取校区列表
        // var areaLists = store.get('areaList');
        // baiduMap.addAreaList('map', areaLists);

        var focus_length = carouselOrg.find('.org-select').length;

        var screenWidth = 1100 ;//window.screen.width;

        var carouselWidth = screenWidth * (focus_length + 2);

        carouselOrg.find('.carousel-inner').css('width',carouselWidth);
        carouselOrg.find('.carousel-img-item').css('width',screenWidth);
        carouselOrg.find('.section:not(.org-carousel)').css('width',screenWidth);


        var orgNum = store.get('orgnumber');
        tianxiaoLog.send(orgNum, 'index');



        course
        .on('click', '[data-address]', function (e) {

            var target = $(e.currentTarget);
            var index = target.data('index');

            if (mapHash[index]) {
                mapHash[index].show();
            } else {
                var address = target.data('address');
                var map = '<div id="course-map-'+index+'" style="height:400px;"></div>';
                mapHash[index] = new Dialog({
                    title: '上课地点',
                    content: map,
                    disposeOnHide: false,
                    width: 600,
                    onAfterShow: function(){
                        courseMap.search('course-map-'+index, address);
                    }
                });
            }

            return;
        })
        .on('mouseenter', '.course-tab div', function (e) {
            var element = $(this);
            var domain = store.get('domain');
            var url = 'http://www.genshuixue.com/i/course/' + domain;
            var more = course.find('.more');
            course.find('.course-tab div').removeClass('active');
            element.addClass('active');

            if (element.hasClass('class-tab')) {
                course.find('.video-list').hide();
                course.find('.course-list').show();
                more.prop('href', url);
            } else {
                course.find('.video-list').show();
                course.find('.course-list').hide();
                more.prop('href', url+'?type=2');
            }
        })

        /**
         * 弹出教师视频
         */
        video
        .on('click' , '.video-thumbnail' , function (e) {

            var element = $(this);
            var title = element.data('name');
            new VideoDialog({
                url: element.data('video'),
                title: title ? title : '机构视频'
            });
        });

        /**
         * 弹出教师照片
         */
        photo
        .on('click' , '.img-thumbnail' , function (e) {
            var images = photo.find('.img-thumbnail');
            var index = images.index(e.currentTarget);
            var data = images.map(function (index, item) {
                var element = $(item);
                var title = element.data('name');
                return {
                    url: element.data('image'),
                    title: title ? title : '机构图片'
                };
            });

            new ImageDialog({
                data: data,
                index: index
            });
        });

        //弹出评论照片
        orgComment
        .on('click', '.photo-item', function (e) {
            var images = orgComment.find('.photo-item');
            var index = images.index(e.currentTarget);
            var data = images.map(function (index, item) {
                var element = $(item);
                var title = element.data('name');
                return {
                    url: element.data('image'),
                    title: title ? title : '评论图片'
                };
            });

            new ImageDialog({
                data: data,
                index: index
            });
        });

        comment
        .on('click' , '.nav-item' , function (e) {
            var element = $(this);
            var face = element.data('face');
            // 高亮选中项
            comment.find('.nav-item').removeClass('active');
            element.addClass('active');
            // 显示选中评价列表
            comment.find('.list').hide();
            if (!face) {
                comment.find('.allcomment').show();
            } else if (face == 1) {
                comment.find('.greatcomment').show();
            } else if (face == 2) {
                comment.find('.middlecomment').show();
            } else if (face == 3) {
                comment.find('.lowercomment').show();
            }

        });

        // 点击优惠卷判断身份
        coupon
        .on('click', 'a', function (e) {
            var user = store.get('user');
            var hasLogin = user.number;
            if (!hasLogin) {
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                    }
                });
            }
            else if (user.type === 0) {
                new SwitchRoleDialog({
                    createText: '需要开通学生身份才能领取优惠券哦~现在开通？',
                    switchText: '需要切换学生身份才能领取优惠券哦~现在切换？',
                    switchTo: 'student',
                    onSuccess: function (data) {
                        location.reload();
                    }
                });
            }
            else {
                location.href = $(this).data('url');
            }
        });
        orgComment
        .on('click', '[data-page]', function () {
            params.page = $(this).data('page');
            getOrgCommentList(params);
            return false;
        })
        .on('click', '[data-face]', function (e) {
            var target = $(e.currentTarget);
            if (params.faceType != target.data('face')) {
                params.page = 1;
                params.faceType = target.data('face');
                getOrgCommentList(params);
            }
            return false;
        });
        noticeTip
        .on('click', '.icon-close', function () {
            noticeTip.css('display', 'none');
        });

        var carousel = new Carousel({
            element: carouselOrg,
            iconSelector: '.org-select',
            itemSelector: '.carousel-real-item',
            prevSelector: '.promotion-slider-left',
            nextSelector: '.promotion-slider-right',
            activeClass: 'active',
            delay: 5000,
            autoPlay: true,
            pauseOnHover: true,
            trigger: 'click',

            animation: function (data) {
                var element = carouselOrg.find('.carousel-inner');
                var len = element.children().length;

                var navLength = len - 2;

                var toIndex = data.to;
                var fromIndex = data.from;

                if (fromIndex == 0 && toIndex == navLength - 1) {
                    toIndex = -1;
                }
                else if (fromIndex == navLength - 1 && toIndex == 0) {
                    toIndex = navLength;
                }

                var focusImgWidth = screenWidth;

                var leftPosition = -focusImgWidth;
                var movPosition = -focusImgWidth - toIndex * focusImgWidth;
                var rightPosition = -navLength * focusImgWidth;

                element
                .animate(
                    {
                        left: movPosition
                    },
                    800,
                    'easeOutQuad',
                    function() {
                        var pos;

                        if (toIndex === navLength) {
                            pos = leftPosition;
                        }
                        if (toIndex === -1) {
                            pos = rightPosition;
                        }

                        if (pos != null) {
                            carouselOrg.find('.carousel-inner').css('left', pos);
                        }
                    }
                );
            }
        });
        carousel.play();

        var blackboard = $('.blackboard');
        new Slider({
            element: blackboard,
            itemSelector: '.blackboard-real-item',
            duration: 150,
            delay: 4000,
            isVertical: true,
            activeClass: 'active',
            autoPlay: true,
            pauseOnHover: true,
            trigger: 'click'
        });

        var priceTip = course.find('.price-tip');
        if (priceTip.length > 0) {

            priceTip.each(function(i, item){
                var element = $(item);
                var cur = null,
                    begin = null,
                    end = null,
                    left = null,
                    time = element.find('.time');

                if (element.hasClass('price-tip-begin')) {
                    cur = element.data('cur');
                    begin = element.data('start');
                    left = begin - cur;
                    var interval = setInterval(function(){
                        time.html( dateFormat(--left) );
                        if (left == 0) {
                            clearInterval(interval);
                        }
                    },1000);
                }

                if (element.hasClass('price-tip-end')) {
                    cur = element.data('cur');
                    end = element.data('end');
                    left = end - cur;
                    var interval = setInterval(function(){
                        time.html( dateFormat(--left) );
                        if (left == 0) {
                            clearInterval(interval);
                        }
                    },1000);
                }
            })

        }
    };
});