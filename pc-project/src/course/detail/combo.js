/**
 * @file 3810 联报优惠
 * @author wangyujie
 */
define(function(require, exports) {

    'use strict';

    var store = require('common/store');

    var container = $('#combo');

    /*
     * 四舍五入
     *
     * x, 操作数
     * num, 保留小数位
     */
    function xround(x, num){
        return Math.round(x * Math.pow(10, num)) / Math.pow(10, num);
    }

    /*
     * 判断当前用户可以享受哪种优惠
     * panel 当前套餐模板
     * count 当前用户选中课程数
     */
    function whichDiscount(panel, count) {
        var discounts = panel.data('discounts');

        var tempAmount = 0; // 临时存储最接近count的课程数目
        var discount; // 当前可享受的优惠程度
        var discountType; // 当前可享受的优惠种类

        for (var i=0, len=discounts.length; i<len; i++) {

            if (discounts[i]['course_amount'] == count) {
                if (discounts[i]['discount_ratio']) { // 折扣
                    return {
                        discount: discounts[i]['discount_ratio'],
                        type: 'ratio'
                    }
                } else if (discounts[i]['discount_point']) { // 满减
                    return {
                        discount: discounts[i]['discount_point'],
                        type: 'point'
                    }
                }
            } else if (discounts[i]['course_amount'] < count) {
                // 取更接近count的较大值
                if (tempAmount < discounts[i]['course_amount']) {
                    tempAmount = discounts[i]['course_amount'];
                    if (discounts[i]['discount_ratio']) { // 折扣
                        discount = discounts[i]['discount_ratio'];
                        discountType = 'ratio';
                    } else if (discounts[i]['discount_point']) { // 满减
                        discount = discounts[i]['discount_point'];
                        discountType = 'point';
                    }
                }

            }
        }

        return {
            discount: discount,
            type: discountType
        };
    }

    /*
     * 实时计算并展示最新的套餐价位
     * panel 某组套餐
     */
    function recountPrice(panel) {

        var courseList = panel.find('.course-list');
        var courseMore = panel.find('.course-more');
        var computer = panel.find('.combo-compute');

        var oriPrice = Number(store.get('price')); // 课程原价
        var totalPrice = oriPrice; // 折扣后，套餐实际总价
        var count = 1; // 当前套餐含课程数目
        var discount = 1; // 10折为原价

        // 统计总数
        courseList.find('.course-item')
        .each(function(index, item) {
            var checkBox = $(item).find(':checkbox');
            if (checkBox.prop('checked')) {
                oriPrice += Number(checkBox.val());
                count++;
            }
        });

        // 判断当前用户可以享受哪种优惠
        discount = whichDiscount(panel, count);

        if (discount.type == 'ratio') { // 折扣，0-100

            // 本课程打折
            totalPrice = totalPrice * discount.discount / 100;
            // totalPrice = Number(totalPrice.toFixed(2));
            totalPrice = xround(totalPrice, 2);

            // 除去本课程之外的循环 - 每节课分别打折，再求和
            courseList.find('.course-item')
            .each(function(index, item) {
                var checkBox = $(item).find(':checkbox');
                if (checkBox.prop('checked')) {
                    var temp = Number(checkBox.val()) * discount.discount / 100;
                    // totalPrice += Number(temp.toFixed(2));
                    totalPrice += xround(temp, 2);
                }
            });

        } else if (discount.type == 'point') { // 满减，单位为分

            // 除去本课程之外的循环 - 先取总价，再满减
            totalPrice = oriPrice - discount.discount / 100; // 折后总价
            if (totalPrice < 0) {
                totalPrice = 0;
            }
        }

        // 保留两位小数，后四舍五入
        computer.find('.total-price em').text(xround(totalPrice, 2));
        computer.find('.ori-price em').text(xround(oriPrice, 2));
        computer.find('.save-price em').text(xround(oriPrice-totalPrice, 2));
    }

    /*
     * 套餐课程上下翻页
     * group 当前显示课程组
     */
    function pageTurn(group) {

        var panel = group.closest('.tab-panel');
        var courseMore = panel.find('.course-more');
        var upIcon = courseMore.find('.icon-angle-up');
        var downIcon = courseMore.find('.icon-angle-down');

        if (group.prev('.item-group').length === 0) {
            upIcon.addClass('disable');
        } else {
            upIcon.removeClass('disable');
        }

        if (group.next('.item-group').length === 0) {
            downIcon.addClass('disable');
        } else {
            downIcon.removeClass('disable');
        }
    }

    exports.init = function() {

        container
        .on('click', '.tab-nav b', function(e) { // 套餐切换
            var target = $(e.currentTarget);
            var tabNav = target.closest('.tab-nav');
            // 切换active类
            if (target.hasClass('active')) {
                return;
            } else {
                tabNav.find('b')
                .each(function(index, item) {
                    $(item).removeClass('active');
                });
                target.addClass('active');
            }
            // 打开对应tab内容
            var num = target.data('num');
            tabNav.next('.tab-content').find('.tab-panel')
            .each(function(index, item) {
                if ($(item).data('num') == num) {
                    $(item).show();
                } else {
                    $(item).hide();
                }
            });
        })

        .on('click', ':checkbox', function(e) { // 套餐课程选择
            var target = $(e.currentTarget);
            var panel = target.closest('.tab-panel');
            recountPrice(panel);
        })

        .on('click', '.icon-angle-up', function(e) { // 向上翻页
            var target = $(e.currentTarget);
            var panel = target.closest('.tab-panel');
            var courseList = panel.find('.course-list');

            if (target.hasClass('disable')) {
                return;
            }
            var currentGroup = courseList.find('.show');
            var prevGroup = currentGroup.prev();
            if (prevGroup.length) {
                currentGroup.removeClass('show');
                prevGroup.addClass('show');

                pageTurn(prevGroup); // 翻页icon
            }
        })

        .on('click', '.icon-angle-down', function(e) { // 向下翻页
            var target = $(e.currentTarget);
            var panel = target.closest('.tab-panel');
            var courseList = panel.find('.course-list');

            if (target.hasClass('disable')) {
                return;
            }
            var currentGroup = courseList.find('.show');
            var nextGroup = currentGroup.next();
            if (nextGroup.length) {
                currentGroup.removeClass('show');
                nextGroup.addClass('show');

                pageTurn(nextGroup); // 翻页icon

            }
        })

        .on('click', '.combo-purchase', function(e) { // 立即购买
            var target = $(e.currentTarget);
            var panel = target.closest('.tab-panel');
            var courseList = panel.find('.course-list');

            var numArr = []; // 已选课程number

            numArr.push(store.get('courseNum'));

            courseList.find('.course-item')
            .each(function(index, item) {
                var checkBox = $(item).find(':checkbox');
                if (checkBox.prop('checked')) {
                    numArr.push($(item).data('number'));
                }
            });

            location.href = '/pay/productGroup?course_numbers=' + numArr.join() + '&activity_id=' + panel.data('num');

        });

    };

});