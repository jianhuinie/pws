/**
 * @file 6.16活动详情页
 * @author caoying
 *
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var etpl = require('cobble/util/etpl');
    var Dialog = require('cobble/ui/Dialog');
    var Tooltip = require('cobble/ui/Tooltip');
    var service = require('common/service');
    var LoginDialog = require('common/component/LoginDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');


    var main = $('#main');
    var header = main.find('.content-header');
    var footer = main.find('.content-footer');
    var bg_content = main.find('.background-content');
    var content = main.find('.content');
    var fireCourse = content.find('.fire-course');
    var seniorTeacher = content.find('.senior-teacher');
    var instDiscount = content.find('.inst-discount');

    var couponListDialogTpl = $('#coupon-list-dialog').html();
    var getCouponSuccessDialogTpl = $('#get-coupon-success-dialog').html();
    var getCouponErrorDialogTpl = $('#get-coupon-error-dialog').html();


    etpl.addFilter('truncate', function (value, length) {
        return value.substring(0, length);
    })

    var COUPON_TEMPLATE = ''
        + '<!-- for: ${coupons} as ${coupon}, ${index} -->'
        + '<li class="org-item" data-index="${index}">'
        +     '<div class="img-wrapper">'
        +          '<img src="${coupon.avatar}" width="100px" height="100px"/>'
        +     '</div>'
        +     '<div class="org-info">'
        +          '<div class="org-name" title="${coupon.display_name}">'
        +               '${coupon.display_name|truncate(6)}'
        +          '</div>'
        +          '<div class="org-coupon">'
        +                    '${coupon.coupon[0].value}元'
        +                    '<span class="org-coupon-tip">优惠券</span>'
        +          '</div>'
        +          '<div class="org-info-action">'
        +               '<div class="get-coupon action">领取</div>'
        +          '</div>'
        +      '</div>'
        + '</li>'
        + '<!-- /for -->';



    //var pagerRender = etpl.compile(PAGER_TEMPLATE);
    var couponRender = etpl.compile(COUPON_TEMPLATE);

    var couponListDialogTplRender = etpl.compile(couponListDialogTpl);
    var getCouponErrorDialogTplRender = etpl.compile(getCouponErrorDialogTpl);

    /**
     * 领劵错误提示
     * @param  {object} response 返回值
     */
    function errTip(response) {
        new Dialog({
            content: getCouponErrorDialogTplRender({
                data: {
                    message: response.msg
                }
            }),
            width: 480
        });
    }

    exports.init = function (){

        var user = store.get('user');
        var hasLogin = user.id;
        var zslsCoupon = store.get('zslsCoupon');
        var instCoupon = store.get('instCoupon');
        var staticOrigin = store.get('static_origin');

        // 设置资深老师的姓名及二级类目
        var $summary = seniorTeacher.find('.teacher-summary');
        $summary.each(function(){
            var originName = $(this).find('.teacher-name').text();
            var name = originName.substring(0, 4);
            var originSubject = $(this).find('.subject').text();
            var subject = originSubject.substring(0,4);

            $(this).find('.teacher-name').text(name).attr('title', originName);
            $(this).find('.subject').text(subject).attr('title', originSubject);
        });


        // 5类课程详情页面头部尾部定义
        var headerArray = {
            // 爆品暑假班
            "bpsjb": [
                        "url(http://img.gsxservice.com/0cms/d/file/content/2015/05/555e933161494.jpg) 50% 0 no-repeat",
                        [
                            "url(" + staticOrigin + "/asset/img/rave/summer_footer.jpg) 50% 0 no-repeat",
                            "url(" + staticOrigin + "/asset/img/rave/summer_other.jpg) repeat-x",
                            "#fe7c98",
                            "#fd708e",
                            "#ffbbca",
                            "#fe7b97",
                            "#fe7c98"
                        ]
                     ],
            // 大学专场
            "dxzc": [
                        "url(http://img.gsxservice.com/0cms/d/file/content/2015/05/555e984de4415.jpg) 50% 0 no-repeat",
                        [
                            "url(" + staticOrigin + "/asset/img/rave/un_footer.jpg) 50% 0 no-repeat",
                            "url(" + staticOrigin + "/asset/img/rave/un_other.jpg) repeat-x",
                            "#81d4fd",
                            "#7cd0fc",
                            "#b8e5fc",
                            "#80d3fd",
                            "#81d4fe"
                        ]
                    ],
            // 小初高专场
            "xcgzc": [
                        "url(http://img.gsxservice.com/0cms/d/file/content/2015/05/555e933131392.jpg) 50% 0 no-repeat",
                        [
                            "url(" + staticOrigin + "/asset/img/rave/bf_un_footer.jpg) 50% 0 no-repeat",
                            "url(" + staticOrigin + "/asset/img/rave/bf_un_other.png) repeat-x",
                            "#c5f4e4",
                            "#a7f3da",
                            "#91e7c9",
                            "#c3f3e3",
                            "#c6f4e4"
                        ]
                    ],
            // 留学专场
            "lxzc": [
                        "url(http://img.gsxservice.com/0cms/d/file/content/2015/05/555e9330d2422.jpg) 50% 0 no-repeat",
                        [
                            "url(" + staticOrigin + "/asset/img/rave/abroad_footer.jpg) 50% 0 no-repeat",
                            "url(" + staticOrigin + "/asset/img/rave/abroad_other.jpg) repeat-x",
                            "#ba91ff",
                            "#b48cff",
                            "#dac4ff",
                            "#b990ff",
                            "#ba91ff"
                        ]
                    ],
            // 艺术兴趣高专场
            "ysxqzc":   [
                            "url(http://img.gsxservice.com/0cms/d/file/content/2015/05/555e93310829f.jpg) 50% 0 no-repeat",
                            [
                                "url(" + staticOrigin + "/asset/img/rave/art_footer.jpg) 50% 0 no-repeat",
                                "url(" + staticOrigin + "/asset/img/rave/art_other.jpg) repeat-x",
                                "#ff9037",
                                "#ff8b34",
                                "#ffb272",
                                "#fe8f36",
                                "#ff9037"
                            ]
                        ]
        }

        $.each(headerArray, function(key,value) {
            if (key == store.get('subject')) {
                header.css("background",value[0]);

                footer.css("background",value[1][0]);
                bg_content.find('.background-picture').css("background",value[1][1]);

                // 设置背景颜色，解决浏览器兼容性的问题
                bg_content.css("background","FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=" + value[1][2] + ",endColorStr=" + value[1][3]+")");  // IE 6、7、8
                bg_content.css("background","-ms-linear-gradient(50%, " + value[1][2] + ",  " + value[1][3] + ")");  // IE 10
                bg_content.css("background","-moz-linear-gradient(50%,"+ value[1][2] + "," + value[1][3] + ")");    // 火狐
                bg_content.css("background","-webkit-gradient(linear, 50% 50%, 50% 100%,from(" + value[1][2]+ "), to(" + value[1][3] + "))");   // 谷歌
                bg_content.css("background","-webkit-gradient(linear, 50% 50%, 50% 100%, from(" + value[1][2] + "), to(" + value[1][3] + "))");  // Safari 4-5, Chrome 1-9
                bg_content.css("background","-webkit-linear-gradient(50%, " + value[1][2] + "," + value[1][3] + ")");  // Safari5.1 Chrome 10+
                bg_content.css("background","-o-linear-gradient(50%, " + value[1][2] + ", " + value[1][3] + ")");  // Opera 11.10+

                content.find('.detail').css("background",value[1][4]);
                content.find('.senior-teacher').css("background",value[1][5]);
                content.find('.inst-discount').css("background",value[1][6]);
            }
        });

        fireCourse
        .on('click', '.btn-primary', function(e) {

            // 未登录事件的处理
            if ( !hasLogin ) {

                new LoginDialog({
                    next: window.location.href,
                    onSuccess: function () {
                        location.reload();
                        $(window).scrollTop(0);
                    }
                });
            }
            else {
                var classNumber = $(this).closest('.detail-li').find('.class-number').text();
                window.open('../teacher/classCourseDetail?number=' + classNumber, '_blank');
            }

        })

        // 爆品课程课程名称展示
        .on('mouseenter', '.img-tip', function(e) {
             new Tooltip({
                element: $(this).find('[data-title]')
            });
        })

        // 领取优惠劵
        content
        .on('click', '.inst, .teacher', function(e) {

            // 未登录事件的处理
            if ( !hasLogin ) {

                new LoginDialog({
                    next: window.location.href,
                    onSuccess: function () {
                        location.reload();
                        $(window).scrollTop(0);
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
                return false;
            }
            else{

                if ( $(this)[0].className.indexOf('teacher') > 0 ){
                    var dataIndex = $(this).parents('.senior-item').data('index');
                    var data = zslsCoupon[dataIndex].coupon;

                }
                else{
                    var dataIndex = $(this).parents('.inst-item').data('index');
                    var data = instCoupon[dataIndex];
                }

                var dialog = new Dialog({
                    content: couponListDialogTplRender(
                                    {
                                        data: {
                                            name: data.display_name,
                                            coupons: data.coupon
                                        }
                                    }),
                    width: 480
                });

                dialog.element.on('click', '.coupon-item', function () {

                    var serialNo = $(this).data('serial');

                     //调用领取优惠券Ajax接口
                    service
                    .getCoupon (
                    {
                        serial_num: serialNo,
                    },
                    {
                        errorHandler: {
                            "1":errTip,
                            "2":errTip,
                            "3":errTip,
                            "4":errTip,
                            "5":errTip
                        }

                    }).done( function (response){
                        dialog.hide();
                        var responseData = response.data;

                        if ( response.code == 0 ){
                            var dialogSuccess = new Dialog({
                                content: getCouponSuccessDialogTpl,
                                width: 480
                            });

                            dialogSuccess.element.on('click', '.use-coupon', function (e) {
                                dialogSuccess.hide();
                                window.open( responseData.url, '_blank');
                            });
                        }



                    });
                });

            }


        })
    };

});