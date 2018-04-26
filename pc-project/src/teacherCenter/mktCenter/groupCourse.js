/**
 * @file 营销中心 - 添加促销活动的班课
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var service = require('common/service');
    var cookie = require('cobble/util/cookie');
    var Dialog = require('cobble/ui/Dialog');
    var dateUtil = require('cobble/util/date');
    var SaveButton = require('common/component/SaveButton');
    var jsonUtil = require('cobble/util/json');
    var Validator = require('cobble/form/Validator');

    var container, selectedCourseDiv, centerId;

    function submit() {
        var courses = [];
        var errorNum = 0;
        var saveType = store.get('saveType');

        container
        .find('.tab-content .active')
        .find('table.checked')
        .each(function (index, item) {

            var courseNumber = $(item).find('input[name="course_number"]').val();
            var courseType = $(item).find('input[name="course_type"]').val();
            var prePrice = parseFloat($(item).find('.course-price span').html());
            var price = parseFloat($(item).find('.curr-price span').html());

            if (prePrice == price) {
                $(item).find('.message').show(); // 错误信息
                $(item).find('.message span').html('未设置折扣信息');
            }

            // 错误统计
            if ($(item).find('.message :visible').length) {
                errorNum++;
            }

            courses.push({
                pre_price: prePrice,
                price: price,
                course_number: courseNumber,
                course_type: courseType
            });
        });

        if (courses.length == 0) {
            alert('你还没有选中任何课程哦~');
        }
        else if (errorNum > 0) {
            alert('有' + errorNum + '个课程的折扣信息设置有误，<br />请修改后再保存哦！');
        }
        else {
            container.find('.btn-update').prop('disabled', true);
            if (saveType == 1) {
                service
                .addGroupCourse(
                    {
                        centerId: centerId,
                        courses: jsonUtil.stringify(courses)
                    }
                )
                .done(function (response) {

                    if (response.code === 0) {
                        success('保存成功', function(){
                            location.href = '/market/list?type=1';
                        });
                    }
                });
            }
            else if (saveType == 2) {
                service
                .updateGroupCourse(
                    {
                        centerId: centerId,
                        courses: jsonUtil.stringify(courses)
                    }
                )
                .done(function (response) {

                    if (response.code === 0) {
                        success('保存成功', function(){
                            location.href = '/market/list?type=1';
                        });
                    }
                });
            }
        }
    }

    /*
     * 统计用户已选课程数目
     */
    function countChoicedCourse () {

        var count = 0;

        container
        .find('.tab-content .active')
        .find('input[name="course_number"]')
        .each(function (index, item) {
            if ($(item).prop('checked')) {
                count++;
            }
        });

        selectedCourseDiv.html(count);
    }

    /*
     * 通过折扣计算减免与折后价
     *
     * @param {number} discount 折扣
     * @param {number} coursePrice 原价
     * @param {object} currTable 当前操作的班课（table）
     */
    function toDiscount (discount, coursePrice, currTable) {

        if (discount == '') { // 为空不计算
            return false;
        }
        else if (/(^\d+$)|(^\d+\.\d{1,2}$)/.test(discount) && discount>=0 && discount<10) {

            var discountAmp = parseFloat(discount) * 100; // (折扣允许两位小数)
            coursePrice = parseFloat(coursePrice);

            var currPrice = (coursePrice * discountAmp / 1000).toFixed(2);
            var derate = (coursePrice - currPrice).toFixed(2);

            currTable.find('input[name="discount"]').val(discount);
            currTable.find('input[name="derate"]').val(derate);
            currTable.find('.curr-price span').html(currPrice);
            currTable.find('.message').hide(); // 错误信息取消
        }
        else {
            currTable.find('.message').show(); // 错误信息
            currTable.find('.message span').html('折扣信息设置有误');
            return false;
        }
    }

    /*
     * 通过减免计算折扣与折后价
     *
     * @param {number} derate 减免
     * @param {number} coursePrice 原价
     * @param {object} currTable 当前操作的班课（table）
     */
    function toDerate (derate, coursePrice, currTable) {

        if (derate == '') { // 为空不计算
            return false;
        }

        if (!/(^\d+$)|(^\d+\.\d{1,2}$)/.test(derate)) { // 输入数值
            currTable.find('.message').show(); // 错误信息
            currTable.find('.message span').html('折扣信息设置有误');
            return false;
        }

        derate = parseFloat(derate);  // 减免允许两位小数
        coursePrice = parseFloat(coursePrice);

        if (derate < 0) {
            currTable.find('.message').show(); // 错误信息
            currTable.find('.message span').html('折扣信息设置有误');
            return false;
        }
        else if (derate > coursePrice) {
            currTable.find('.message').show(); // 错误信息
            currTable.find('.message span').html('折扣信息设置有误');
            return false;
        }

        var currPrice = (coursePrice - derate).toFixed(2);
        var discount = (currPrice * 10 / coursePrice).toFixed(2);

        currTable.find('input[name="derate"]').val(derate);
        currTable.find('input[name="discount"]').val(discount);
        currTable.find('.curr-price span').html(currPrice);
        currTable.find('.message').hide(); // 错误信息取消
    }

    exports.init = function() {

        container = $('#content');
        selectedCourseDiv = container.find('.selected-course span');
        centerId = container.find('input[name="center_id"]').val();
        var saveType = store.get('saveType'); // 1add 2update

        // 计算已选课程
        countChoicedCourse();

        container
        .on('click', '.tab-nav .nav-item', function (e) { // 切换tab
            var target = $(e.currentTarget);

            if (target.hasClass('active')) {
                return;
            }

            var tab = target.closest('.tab');
            var type = target.data('type');

            // tab-nav
            tab
            .find('.tab-nav .nav-item')
            .each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
            });
            target.addClass('active');

            // tab-content
            tab
            .find('.tab-content .tab-panel')
            .each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
                if ($(item).data('type') == type) {
                    $(item).addClass('active');
                }
            });
        })

        .on('click', '.checked-flag', function (e) { // 选中某班课

            var target = $(e.currentTarget);
            var currTable = target.closest('table');
            var checkBox = target.find('input[type="checkbox"]');

            if (currTable.hasClass('checked')) { // 选中，则取消
                checkBox.prop('checked', false);
                currTable.removeClass('checked');
            }
            else { // 选中
                checkBox.prop('checked', true);
                currTable.addClass('checked');
            }

            countChoicedCourse();
        })

        .on('blur', 'input[name="discount"]', function (e) { // 打折

            var target = $(e.currentTarget);
            var currTable = target.closest('table');

            // 依折扣，计算减免与折后价
            var discount = target.val();
            var coursePrice = currTable.find('.course-price span').html();

            toDiscount(discount, coursePrice, currTable);
            // 与批量操作互斥
            container.find('#discount-all').val('');
            container.find('#derate-all').val('');
        })

        .on('blur', 'input[name="derate"]', function (e) { // 减免

            var target = $(e.currentTarget);
            var currTable = target.closest('table');

            // 依减免，计算折扣与折后价
            var derate = target.val();
            var coursePrice = currTable.find('.course-price span').html();

            toDerate(derate, coursePrice, currTable);
            // 与批量操作互斥
            container.find('#discount-all').val('');
            container.find('#derate-all').val('');
        })

        .on('blur', '#discount-all', function (e) { // 批量打折

            var target = $(e.currentTarget);
            var discount = target.val();

            // 与批量减免互斥
            container.find('#derate-all').val('');

            // 批量处理所有选中的课程记录
            container
            .find('table.checked')
            .each(function (index, item) {

                var coursePrice = $(item).find('.course-price span').html();
                toDiscount(discount, coursePrice, $(item));

            });
        })

        .on('blur', '#derate-all', function (e) { // 批量减免

            var target = $(e.currentTarget);
            var derate = target.val();

            // 与批量打折互斥
            container.find('#discount-all').val('');

            // 批量处理所有选中的课程记录
            container
            .find('table.checked')
            .each(function (index, item) {

                var coursePrice = $(item).find('.course-price span').html();
                toDerate(derate, coursePrice, $(item));

            });
        })

        .on('click', '.question-icon', function () {
            alert({
                title: '温馨提示',
                width: 400,
                skinClass: 'question-dialog',
                content: ''
                   +    '<p>1.已开课的课程以插班价为基础价设置限时折扣。</p>'
                   +    '<p>2.若您设置的插班价为“未结束课程总价”，则设置限时折扣时以课程当前的插班价为活动的基础价，且设置完成后活动价固定不变。</p>'
                   +    '<p>3.若您在开课期间设置限时折扣，则会优先显示限时折扣的价格，即学生下单时会以活动价下单。</p>'
                   +    '<p>4.若您设置的插班价为“未结束课程总价”，插班价是随着每课节结束递减的，但活动价不变，可能会出现活动价高于插班价，但学生仍会以较高的活动价下单的情况。</p>',
            })
        });

        // 添加课程 与 保存修改
        if (container.find('.btn-update').length) {
            var sendButton = new SaveButton({
                element: container.find('.btn-update'),
                save: function () {

                    if (!cookie.get('setLimit')) {
                        var limitDialog = new Dialog({
                            title: '温馨提示',
                            width: 480,
                            skinClass: 'limit-dialog',
                            content: ''
                               +    '<div class="section">'
                               +        '<p>1. 已开课的班课设置限时折扣是以当前的插班价为基础价设置折扣，且设置完成后活动价固定不变；其他状态班课是以现价为基础价设置折扣。</p>'
                               +        '<p>2. 只有售卖中状态的视频课可以设置限时折扣。</p>'
                               +        '<p>3. 已设置限时折扣的课程在活动期内学生以活动价购买课程。</p>'
                               +        '<p>4. 班课设置限时折扣的活动时间包含开课后，则开课后学生仍会以活动价购课，可能会出现活动价高于插班价，但学生仍会以较高的活动价下单的情况。</p>'
                               +        '<p>5. 已开课的班课设置限时折扣，若您设置的插班价为“未结束课程总价”，插班价是随着每课节结束递减的，但活动价不变，可能会出现活动价高于插班价，但学生仍会以较高的活动价下单的情况。</p>'
                               +    '</div>'
                               +    '<label class="no-tips"><input type="checkbox"/> 不再提示</label>'
                               +    '<div class="dialog-action"><button class="btn-primary btn-hide">确定</button></div>',
                            onBeforeShow: function () {
                                var limit = $('.limit-dialog');
                                limit.find('.no-tips input').click(function (e){
                                    var element = $(this);
                                    var expireTime = dateUtil.add(new Date(), 365);
                                    if (element.is(':checked')) {
                                        cookie.set('setLimit', 1, {
                                            domain: '.genshuixue.com',
                                            expires: expireTime
                                        })
                                    }
                                    else {
                                        cookie.remove('setLimit', {
                                            domian: '.genshuixue.com'
                                        })
                                    }
                                });
                                limit.find('.btn-hide').click(function (e) {
                                    submit();
                                    limitDialog.hide();
                                })
                            }
                        })
                    }
                    else {
                        submit();
                    }

                }
            });
        }

        // 课程退出活动
        if (container.find('.btn-del').length) {
            var sendButton = new SaveButton({
                element: container.find('.btn-del'),
                save: function () {

                    var coursesIds = [];

                    container
                    .find('table.checked')
                    .each(function (index, item) {
                        var id = $(item).find('input[name="course_id"]').val();
                        coursesIds.push(id);
                    });

                    if (coursesIds.length) {
                        service
                        .delGroupCourse(
                            {
                                centerId: centerId,
                                coursesIds: jsonUtil.stringify(coursesIds)
                            }
                        )
                        .done(function (response) {
                            if (response.code === 0) {
                                success('退出活动成功', function(){
                                    location.reload();
                                });
                            }
                        });
                    }
                    else {
                        alert('你还没有选中任何课程哦~');
                    }

                }
            });
        }

    }
});