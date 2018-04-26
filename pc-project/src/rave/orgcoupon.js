/**
 * @file 机构的优惠券
 * @author zengcheng
 */

define(function (require, exports) {

    var etpl = require('cobble/util/etpl');
    var store = require('common/store');
    var service = require('common/service');
    var Dialog = require('cobble/ui/Dialog');
    var LoginDialog = require('common/component/LoginDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');

    var org = $('#org-rave-wrapper .org-wrapper');
    var categoryList = org.find('.org-category-list');
    var couponListWrapper = org.find('.org-info-list-wrapper');
    var couponContainer = couponListWrapper.find('.org-info-list');
    var pager = couponListWrapper.find('.org-info-pager');
    var couponListDialogTpl = $('#coupon-list-dialog').html();
    var getCouponSuccessDialogTpl = $('#get-coupon-success-dialog').html();
    var getCouponErrorDialogTpl = $('#get-coupon-error-dialog').html();

    var dataSource;
    var pageInfo;

    etpl.addFilter('truncate', function (value, length) {
        return value.substring(0, length);
    })

    //机构优惠券分页模板
    var PAGER_TEMPLATE = ''
        + '<!-- for: ${pagers} as ${p},${index} -->'
        + '<li data-page="${p.number}" class="org-page <!-- if: ${index} == 0 -->active<!-- /if -->">'
        +     '<a href="javascript:void(0);">${p.number}</a>'
        + '</li>'
        + '<!-- /for -->';

    //机构优惠券列表模板
    var COUPON_TEMPLATE = ''
        + '<!-- for: ${coupons} as ${coupon}, ${index} -->'
        + '<li class="org-item" data-index="${index}">'
        +     '<div class="img-wrapper">'
        +          '<img src="${coupon.avatar}@100w_100h_1c_1e" width="100px" height="100px"/>'
        +     '</div>'
        +     '<div class="org-info">'
        +          '<div class="org-name" title="${coupon.display_name}">'
        +               '<!-- if: ${coupon.type} == 2 -->'
        +               '${coupon.display_name}'
        +               '<!-- else -->'
        +               '${coupon.display_name | truncate(3)}<span class="org-subject">${coupon.subject | ""}</span>'
        +               '<!-- /if -->'
        +          '</div>'
        +          '<div class="org-coupon">'
        +                    '${coupon.value}元'
        +                    '<span class="org-coupon-tip">优惠券</span>'
        +          '</div>'
        +          '<div class="org-info-action">'
        +               '<!-- if: ${coupon.available} -->'
        +               '<div class="get-coupon action active">领取</div>'
        +               '<!-- else -->'
        +               '<div class="get-coupon action">已领完</div>'
        +               '<!-- /if -->'
        +          '</div>'
        +      '</div>'
        + '</li>'
        + '<!-- /for -->';



    var pagerRender = etpl.compile(PAGER_TEMPLATE);
    var couponRender = etpl.compile(COUPON_TEMPLATE);

    var couponListDialogTplRender = etpl.compile(couponListDialogTpl);
    var getCouponErrorDialogTplRander = etpl.compile(getCouponErrorDialogTpl);

    /**
     * 渲染当前分类的分页
     */
    function renderPager(coupons, pageSize) {
        pageSize = pageSize || pageInfo.pageSize;
        var total = coupons.length;
        var pageTotal = Math.floor((total - 1) / pageSize) + 1;
        var pagers = [];
        for (var i = 1; i <= pageTotal; i++) {
            pagers.push({number: i});
        }
        pager.html(pagerRender({pagers: pagers}));
    }

    /**
     *
     * 渲染当前的分类
     * @param  {Array[object]} coupons 优惠券列表
     */
    function renderList(coupons, type) {
        var start = (pageInfo.currentPage-1) * pageInfo.pageSize;
        var end = start + pageInfo.pageSize;
        type = type || 2;
        couponContainer.html(couponRender({coupons: coupons.slice(start, end)}));
    }

    /**
     * 处理数据为可用的数据源
     */
    function dealData(coupon) {
        var dataSource = {};
        var tmp;
        for (var i = coupon.length - 1; i >= 0; i--) {
            tmp = coupon[i];
            dataSource[tmp.info.category] = tmp;
        };
        return dataSource;
    }

    /**
     * 领劵错误提示
     * @param  {object} response 返回值
     */
    function errTip(response) {
        new Dialog({
            content: getCouponErrorDialogTplRander({
                data: {
                    message: (response.msg || response.data.message)
                }
            }),
            width: 480
        });
    }

    exports.init = function (pageSize) {
        var coupon = store.get('rave').coupon;

        dataSource = dealData(coupon);

        //初始化当前的分页信息
        pageInfo = {
            pageSize: (pageSize || 12),
            coupons: coupon[0].coupons,
            currentPage: 1,
            category: coupon[0].info.category
        };

        //初始化分页
        renderPager(coupon[0].coupons);

        //点击分类
        categoryList.on('click', '.org-category-item', function () {
            var that = $(this);
            var key = that.data('key');
            var current = dataSource[key];
            if (!that.hasClass('active')) {
                categoryList.find('.org-category-item').removeClass('active');
                that.addClass('active');
                pageInfo.coupons = current.coupons;
                pageInfo.category = key;
                pageInfo.currentPage = 1;
                renderPager(current.coupons);
                renderList(current.coupons);
            }
        });

        //点击翻页
        pager.on('click', '.org-page', function () {
            var that = $(this);
            if (!$(this).hasClass('active')) {
                var page = +that.data('page');
                pageInfo.currentPage = page;
                pager.find('.org-page').removeClass('active');
                that.addClass('active');
                renderList(pageInfo.coupons);
            }
        });

        //点击跳转老师详情页或机构详情页
        couponContainer.on('click', '.org-item' , function () {
            var dataIndex = $(this).data('index');
            var data = pageInfo.coupons[dataIndex + pageInfo.pageSize * (pageInfo.currentPage - 1)];
            if (data.type == 1) {
                //老师主页
                window.open('/' + data.number, '_blank');
            }
            else {
                //机构主页
                window.open('/i/' + data.number, '_blank');
            }
        });

        //获取优惠劵
        couponContainer.on('click', '.get-coupon.active', function () {

            var user = store.get('user');
            var hasLogin = user.id;

            //是否登录
            if (!hasLogin) {
                new LoginDialog({
                    zIndex: 100,
                    next: window.location.href,
                    onSuccess: function () {
                        location.reload();
                    }
                });
                return false;
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

            //登录之后才能领优惠劵
            var dataIndex = $(this).parents('.org-item').data('index');
            var data = pageInfo.coupons[dataIndex + pageInfo.pageSize * (pageInfo.currentPage - 1)];
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
                service.getCoupon(
                    {
                        serial_num: serialNo
                    },
                    {
                        errorHandler: {
                            "1":errTip,
                            "2":errTip,
                            "3":errTip,
                            "4":errTip,
                            "5":errTip
                        }
                    }).done(function (response) {
                            dialog.hide();
                            if (response.code === 0) {
                                var successDialog = new Dialog({
                                    content: getCouponSuccessDialogTpl,
                                    width: 480
                                });
                                successDialog.element.on('click', '.use-coupon', function () {
                                    successDialog.hide();
                                    if (data.type == 1) {
                                        //老师主页
                                        window.open('/' + data.number, '_blank');
                                    }
                                    else {
                                        //机构主页
                                        window.open('/i/' + data.number, '_blank');
                                    }
                                });
                            }
                        });
            });

            return false;
        });
    };
});