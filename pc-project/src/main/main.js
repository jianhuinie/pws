/**
 * @file 2014.09版首页的脚本文件
 * @author peilonghui
 */

define(function (require) {

    var Carousel = require('cobble/ui/Carousel');
    var Switchable = require('cobble/helper/Switchable');
    var ScrollBar = require('cobble/ui/ScrollBar');

    var service = require('common/service');
    var store = require('common/store');
    var cookie = require('cobble/util/cookie');

    var Slider = require('common/component/Slider');

    var getAdMonitorUrl = require('common/function/getAdMonitorUrl');

    var urlUtil = require('cobble/util/url');

    var animationFrame = require('common/animationFrame');

    var ad = require('./mods/ad');
    var goldCertOrg = require('./mods/goldCertOrg');

    var etpl = require('cobble/util/etpl');

    var lazyImage = require('common/lazyImage');

    var ClickMonitor = require('common/component/ClickMonitor');

    var viewportWidth = require('cobble/function/viewportWidth');

    var eventEmitter = require('common/eventEmitter');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var entrance = require('im/entrance');

    var container;

    // 需要声明用于打包
    require('./mods/special');
    require('./mods/hotLive');
    require('./mods/floor');
    require('./mods/recommendTeacher');
    require('./mods/preferentialCourse');

    var renderAd5 = etpl.compile($('#ad-5-template').html());
    var renderAd10 = etpl.compile($('#ad-10-template').html());
    var renderAd6To9 = etpl.compile($('#ad-6-to-9-template').html());

    /**
     * 初始化轮播图
     *
     * @return
     */
    function initCarouse5(data) {

        // 默认配置
        var adDefault = {
            material: 'http://img.gsxservice.com/0cms/d/file/content/2016/05/573968b14dd08.jpg',
            click: 'http://ju.genshuixue.com?zn=zn_juhuixue_banner_pc ',
            monitor: '',
            clickMonitor: '',
            hover: '聚惠学'
        };

        var container = $('.promotion-slider-container');
        var tmp;

        if (!data || !data.length) {
            data = [adDefault];
        }

        // 没有物料的替换成默认的
        for (var i = data.length - 1; i >= 0; i--) {
            tmp = data[i];
            if (!tmp.material) {
                data[i] = adDefault;
            } else if (!tmp.click){
                tmp.click = 'javascript:void(0);';
            }
        };

        // 初始化轮播
        container.html(renderAd5({promotionList: data}));

        new Slider({
            element: $('.promotion-slider-container'),
            itemSelector: '.promotion-slideritem',
            iconSelector: '.promotion-slider-navitem',
            prevSelector: '.promotion-slider-left',
            nextSelector: '.promotion-slider-right',
            duration: 150,
            delay: 8000,
            onChange: function (e, data) {

                reportCarouseAd(container.find('.promotion-slideritem'), data.to);
            }
        });
    };

    function initClickMonitor() {

        var user = store.get('user') || {};
        var data = store.get();
        var defaultParams = {
            user_number: user.number || '',
            user_role: (user.type == null) ? '' : user.type,
            city_id: data.cityId
        };

        var interceptor = function (ele) {

            var params = {};
            var keyFlag = 'monitor';
            var allData = ele.data();
            var tempKey;
            for (var key in allData){
                if (key.indexOf(keyFlag) === 0) {
                    tempKey = key.substring(keyFlag.length).toLowerCase();
                    if (tempKey) {
                        params[tempKey] = allData[key];
                    }
                }
            }
            params._timestamp = new Date().getTime();
            return params;
        };
        //判断是否是mac系统，是返回true，否则返回false
        function isMacOS(){
            var platform = navigator.platform;
            if(platform.indexOf("Mac") > -1){
                return true;
            }else{
                return false;
            }
        }
        if (isMacOS()) {
            $('.not-mac').hide();
            $('.mac').show();
        }
        else {
            $('.mac').hide();
            $('.not-mac').show();
        }
        return new ClickMonitor({
            selector: '.click-monitor',
            monitorUrl: '//pb0.genshuixue.com/gs.gif',
            defaultParams: defaultParams,
            useDataHref: false,
            isSend: store.get('env') === 'www',
            interceptor: interceptor
        });
    };

    function initAd10(data) {
        // 默认配置
        var adDefault = {
            material: 'http://img.gsxservice.com/0cms/d/file/content/2016/05/57396882b7c12.jpg',
            click: 'http://www.genshuixue.com/static/windows',
            monitor: '',
            clickMonitor: '',
            hover: '在线课堂'
        };

        var container = $('.promotion-right-banner');

        if (!data || !data.length || !data[0].material) {
            data = adDefault;
        }

        if (data[0] && data[0].material) {
            data = data[0];
            if (!data.click) {
                data.click = 'javascript:void(0);';
            }
        }



        container.html(renderAd10({data: data}));
    }

    function initAd11(data) {

        // 默认配置
        var adDefault = {
            material: 'http://img.gsxservice.com/0cms/d/file/content/2016/05/573968008b9b5.png',
            click: 'http://www.genshuixue.com/activity/center?id=43?source=gsx_shipinke2_pc',
            monitor: '',
            clickMonitor: '',
            hover: '视频课'
        };

        var container = $('.bottom-right-banner');

        if (!data || !data.length || !data[0].material) {
            data = adDefault;
        }

        if (data && data[0] && data[0].material) {
            data = data[0];
            if (!data.click) {
                data.click = 'javascript:void(0);';
            }
        }

        container.html(renderAd10({data: data}));
    }

    /**
     * 初始化轮播图2
     * @param {Object} data 广告数据
     * @param {Boolean} alwaysShow9 9号广告位为空就不展示
     *
     */
    function initCarouse6(data, alwaysShow9) {

        var container = $('.bottom-slider-container');

        var fixedEmpty = function (data, maxLength, defaultData, always) {
            var tmp;
            if ((data && data.length) || always) {
                var exist = data.length;
                for (var i = exist; i < maxLength; i++) {
                    data.push(defaultData);
                }
                for (i = exist - 1; i >= 0; i--) {
                    tmp = data[i];
                    tmp.cls = defaultData.cls;
                    !tmp.click && (tmp.click = 'javascript:void(0);')
                    !tmp.material && (data[i] = defaultData)

                }
            }
            return data;
        };

        var isEmpty = function (data) {
            var result = true;
            if (data && data.length) {
                for (var i = data.length - 1; i >= 0; i--) {
                    if (data[i].material) {
                        return false;
                    }
                }
            }
            return result;
        };

        // 默认配置
        var adDefault = {
            '6': {
                material: 'http://img.gsxservice.com/0cms/d/file/content/2016/05/573968e84203f.jpg',
                click: 'http://www.genshuixue.com/teacher/classCourseDetail?number=150417549130',
                monitor: '',
                clickMonitor: '',
                hover: '',
                cls: 'style1'
            },
            '7': {
                material: 'http://img.gsxservice.com/0cms/d/file/content/2016/05/57396906c1281.jpg',
                click: 'http://ju.genshuixue.com?zn=zn_juhuixue_banner_pc ',
                monitor: '',
                clickMonitor: '',
                hover: '聚惠学',
                cls: 'style2'
            },
            '8': {
                material: 'http://img.gsxservice.com/0cms/d/file/content/2016/05/57396906c1281.jpg',
                click: 'http://ju.genshuixue.com?zn=zn_juhuixue_banner_pc ',
                monitor: '',
                clickMonitor: '',
                hover: '聚惠学',
                cls: 'style2'
            },
            '9': {
                material: 'http://img.gsxservice.com/0cms/d/file/content/2016/05/573969453632b.jpg',
                click: 'http://gicorg.genshuixue.com/',
                monitor: '',
                clickMonitor: '',
                hover: '',
                cls: 'style3'
            }
        };

        var tmp;

        // 过滤广告位
        var finalData = [];
        if(!isEmpty(tmp = data['6'])) {
            finalData.push(fixedEmpty(tmp, 4, adDefault['6']));
        }

        if(!isEmpty(tmp = data['7'])) {
            finalData.push(fixedEmpty(tmp, 2, adDefault['7']));
        }

        if(!isEmpty(tmp = data['8'])) {
            finalData.push(fixedEmpty(tmp, 2, adDefault['8']));
        }

        if (!alwaysShow9) {
            finalData.push(fixedEmpty(data['9']||[], 12, adDefault['9'], true));
        }

        // 初始化轮播
        container.html(renderAd6To9({sliderList: finalData}));

        return new Slider({
            element: $('.bottom-slider-container'),
            itemSelector: '.bottom-slideritem',
            iconSelector: '.bottom-slider-navitem',
            prevSelector: '.bottom-slider-left',
            nextSelector: '.bottom-slider-right',
            duration: 150,
            delay: 8000,
            onChange: function (e, data) {
                reportCarouseAd(container.find('.bottom-slideritem'), data.to);
            }
        });
    };

    /**
     * 初始化静态广告
     */
    function initStaticBanner() {
        $('.promotion-right-banner, .bottom-right-banner')
        .each(function (index, item) {
            var monitor = $(item).find('img').data('monitor');
            sendToMonitor(monitor, true);
        })
    }

    /**
     * 绑定广告点击发送曝光
     * @return {[type]} [description]
     */
    function initAdClick() {
        container
        .on('click', '.main-banner [data-click-monitor]', function (e) {
            var monitor = $(this).data('click-monitor');

            sendToMonitor(monitor, true);
            return true;
        });
    }

    function reportCarouseAd(items, index) {

        var target = items.filter('[data-index="' + index + '"]');
        var images = target.find('img');

        if (target.data('reported')) {

            images.each(function (index, img) {
                sendToMonitor($(img).data('monitor'));
            });

        }
        else {

            if (target.data('combine')) { //一些广告需要合并上送曝光地址

                var monitor;

                var combined = $.map(images, function (item, index) {
                    var m = $(item).data('monitor');

                    if (m) {
                        monitor = m;
                        var query = m.indexOf('?') != -1 ? m.substring(m.indexOf('?')) : '';
                        var param = urlUtil.parseQuery(query);

                        return param.c;
                    }
                });

                sendToMonitor(monitor, true, combined);
            }
            else {

                images.each(function (index, img) {
                    sendToMonitor($(img).data('monitor'), true);
                });
            }

            target.data('reported', true);
        }
    }

    var imageListForMonitor = [];

    function sendToMonitor(url, isFirst, combined) {

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


    /**
     * 初始化helper区域的切换
     *
     * @return
     */
    function initHelperNewsSwitch() {

        var switcher = new Switchable({
            element: $('.main-banner-helper-news'),
            index: 0,
            trigger: 'click',
            selector: '.main-banner-helper-news-item',
            activeClass: 'active',
            change: function (data) {


            }
        })
    };

    /**
     * 获取用户登录信息
     */
    function initLoginInfo(onSuccess) {
        var userInfoContainer = $('#main .main-banner-helper-userinfo');
        var appInfo = $('#main .main-banner-helper-cert');

        service
        .getUserBasicInfo()
        .done(function (response) {
            if (response.code === 0) {
                var data = response.data;

                if (data.avatar) {
                    userInfoContainer.find('img').prop('src', data.avatar + '@1e_60w_60h_1c_0i_1o_90Q_1x.jpeg');
                }

                var name = data.display_name || data.user_name;

                if (name) {
                    userInfoContainer.find('.user-name').html('hi，' + name);
                }

                store.set('userType', data.user_type);

                var url;
                if (data.user_type == 0) {
                    url = '/teacher_center/index';
                }
                else if (data.user_type == 2) {
                    url = '/student_center/index';
                }

                if (url) {
                    userInfoContainer.find('a').prop('href', url);
                }

                if ($.isFunction(onSuccess)) {
                    onSuccess();
                }

                // 老师版APP下载
                if (data.user_type == 0) {
                    appInfo.find('.app .download-description').html('跟谁学老师版APP');
                    appInfo.find('.app a').prop('href', '/static/app?type=teacher');
                }
                else {
                    appInfo.find('.app .download-description').html('跟谁学手机APP');
                    appInfo.find('.app a').prop('href', '/static/app');
                }
            }
        });
    }

    /**
     * 获取用户的课表信息
     *
     * @return
     */
    function initUserCourseInfo(userType) {

        var status1 = $('#main-banner-helper-status1').attr('target', '_blank');
        var status2 = $('#main-banner-helper-status2').attr('target', '_blank');
        var status3 = $('#main-banner-helper-status3').attr('target', '_blank');

        service
        .getCourseList()
        .done( function (response) {
            var data = response.data.course_list;
            var commentPrize = response.data.extra && response.data.extra.comment_prize_flag;
            var stat = data.stat;
            var orderLength = data.order_length;

            if (userType == 0) {
                status1
                    .attr('href', '/lesson/teacherLessons?status=2')
                    .attr('data-stype', 'Teacher_1')
                    .html(''
                        + '<span>' + stat[1] + '</span>'
                        + '待确认约课'
                    );

                status2
                    .attr('href', '/lesson/teacherLessons?status=3')
                    .attr('data-stype', 'Teacher_2')
                    .html(''
                        + '<span>' + stat[2] + '</span>'
                        + '待上课'
                    );
                status3
                    .attr('href', '/order/teacherOrders?status=4')
                    .attr('data-stype', 'Teacher_3')
                    .html(''
                        + '<span>' + orderLength + '</span>'
                        + '待评价'
                    );
            }
            else {
                status1
                    .attr('href', '/lesson/studentLessons?status=3')
                    .attr('data-stype', 'Student_1')
                    .html(''
                        + '<span>' + stat[2] + '</span>'
                        + '待上课'
                    );

                status2
                    .attr('href', '/lesson/studentLessons?status=4')
                    .attr('data-stype', 'Student_2')
                    .html(''
                        + '<span>' + stat[3] + '</span>'
                        + '待确认课酬'
                    );

                status3
                    .attr('href', '/order/studentOrders?status=4')
                    .attr('data-stype', 'Student_3')
                    .html(''
                        + '<span>' + orderLength + '</span>'
                        + '待评价'
                        + (commentPrize ? '<i class="icon icon-prize-tip"></i>' : '')
                    );
            }

            $('.main-banner-helper-operation').addClass('active');
        });
    };

    var VideoDialog = require('common/component/VideoDialog');


    function initVideoDialog() {
        var hostname = location.hostname;

        var path = '';

        if (hostname.indexOf('test') === 0) {
            path = '/video/view/1182';
        }
        else {
            path = '/video/view/273544';
        }

        var newVideoDialog = function (e) {
            e.preventDefault();

            new VideoDialog({
                title: '跟谁学宣传片',
                url: path
            });
        }

        $('.introduce-video').on('click', 'a', newVideoDialog);
        //$($('.promotion-slideritem')[0]).on('click', 'a', newVideoDialog);
    };

    /**
     * 初始化banner video
     */
    function initBannerVideo() {

        $('.promotion-slider-container')
        .on('click', '[data-video]', function (e) {
            e.preventDefault();

            var video = $(this).data('video').toLowerCase().match(/id=(\S*)/);
            if (video && video.length > 1) {

                var url = '/video/view/' + video[1];
                var name = $(this).data('name');

                new VideoDialog({
                    title: name,
                    url: url
                });
            }
        });
    };

    return {
        init: function () {
            container = $('#main');

            // 初始化广告位
            eventEmitter.on('ad-promotion-data', function (event, data) {

                // 初始化轮播组件
                initCarouse5(data['5']);
                initAd10(data['10']);
                initCarouse6(data, true);
                initAd11(data['11']);

                initBannerVideo();
                initAdClick();
                initClickMonitor();

                $('.main-banner-promotion.loading').removeClass('loading');
            });

            eventEmitter.on('ad-promotion-data-fail', function (event, data) {

                // 初始化轮播组件
                initCarouse5();
                initAd10();
                initCarouse6({
                    8: [{
                            material: 'http://img.gsxservice.com/0cms/d/file/content/2016/05/5739698459a3e.jpg',
                            click: 'http://www.genshuixue.com/video_course/getcourseshowdetail?number=15051543050',
                            monitor: '',
                            clickMonitor: '',
                            hover: ''
                        },
                        {
                            material: 'http://img.gsxservice.com/0cms/d/file/content/2016/05/5739699c2273e.jpg',
                            click: 'http://www.genshuixue.com/video_course/getcourseshowdetail?number=15040742660',
                            monitor: '',
                            clickMonitor: '',
                            hover: ''
                        }]
                }, true);
                initAd11();

                initBannerVideo();
                initAdClick();
                initClickMonitor();

                $('.main-banner-promotion.loading').removeClass('loading');
            });

            // 初始化广告
            ad.init();

            initHelperNewsSwitch();

            initLoginInfo(function () {

                var userType = store.get('userType');

                if (userType && userType !== -1) {
                    initUserCourseInfo(userType);
                }
            });

            // 绑定右侧用户信息区上报事件
            container
            .on('click', '.main-banner-helper-operation [data-stype]', function () {
                var params = {
                    type: 'UseridInfo_Click',
                    stype: $(this).data('stype'),
                    id: store.get('user').number || ''
                };
                WAT.send('http://click.genshuixue.com/gs.gif', params);
            });


            initVideoDialog();
            initStaticBanner();

            var lastJoin = container.find('.last-join');
            var lastJoinWrapper = container.find('.last-join-wrapper');

            var initWindowResize = function () {
                // 宽屏窄屏切换
                var windowElement = $(window);

                window.onresize = function () {

                    var width = windowElement.width();

                    lastJoin.scrollLeft(0);

                    if (width >= 1190) {
                        container.find('.promotion-right-banner').show();
                        container.find('.bottom-right-banner').show();
                        $('#site-nav').removeClass('narrow-mode')
                                      .removeClass('middle-mode');
                        $('#header').removeClass('narrow-mode')
                                    .removeClass('middle-mode');
                        $('#nav').removeClass('narrow-mode')
                                 .removeClass('middle-mode');
                        container.removeClass('narrow-mode')
                                 .removeClass('middle-mode');
                        $('.feature-box').show();
                        $('#flotage-middle').show();
                        max = lastJoinWrapper.width() - 1190;
                    } else if (width < 1190 && width >= 1014) {
                        container.find('.promotion-right-banner').hide();
                        container.find('.bottom-right-banner').hide();
                        $('#site-nav').removeClass('narrow-mode')
                                      .addClass('middle-mode');
                        $('#header').removeClass('narrow-mode')
                                    .addClass('middle-mode');
                        $('#nav').removeClass('narrow-mode')
                                 .addClass('middle-mode');
                        container.removeClass('narrow-mode')
                                 .addClass('middle-mode');
                        $('.feature-box').hide();
                        $('#flotage-middle').hide();
                        max = lastJoinWrapper.width() - 1014;
                    } else if (width < 1014) {
                        container.find('.promotion-right-banner').hide();
                        container.find('.bottom-right-banner').hide();
                        $('#site-nav').addClass('narrow-mode')
                                      .removeClass('middle-mode');
                        $('#header').addClass('narrow-mode')
                                    .removeClass('middle-mode');
                        $('#nav').addClass('narrow-mode')
                                 .removeClass('middle-mode');
                        container.addClass('narrow-mode')
                                 .removeClass('middle-mode');
                        $('.feature-box').hide();
                        $('#flotage-middle').hide();
                        max = lastJoinWrapper.width() - 1014;
                    }
                };
            };

            lazyImage.init();
            goldCertOrg.init('homepage');

        }
    }
});
