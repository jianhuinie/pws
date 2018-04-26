/**
 * @file 营销中心 未领取优惠券学生列表
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var SaveButton = require('common/component/SaveButton');

    var container = $('#content');
    var dataContainer = container.find('.student-list tbody');
    var pagerContainer = container.find('.pager-container');
    var choicedDiv = container.find('.choiced strong');

    var lastSortBy = 'order_num'; // 始终记录用户最终以什么规则排序，默认为订单数
    var lastSortMode = 'desc'; // 始终记录用户最终以什么规则排序，默认为倒序
    var serialNum;
    var curPage = 0;

    /**
     * 统计当前用户已选择学员数目
     */
    function countChoicedStudent () {
        var count = 0;

        container
        .find('input[name="student_number"]')
        .each(function (index, item) {
            if ($(item).prop('checked')) {
                count++;
            }
        });

        choicedDiv.html(count);
    }

    /*
     * 加载数据
     * @param  {number}   page      页数
     * @param  {string=}   sortBy   排序项
     * @param  {string=}   sortMode   排序规则
     * @param  {Function=} callback 成功后的回调
     */
    function loadData (page, sortBy, sortMode, callback) {

        var data = {};
        dataContainer.html('');
        pagerContainer.html('');

        var byClass = '.' + sortBy;

        if (!sortMode) {
            sortMode = container.find(byClass).data('mode');
        }

        var keyWord = container.find('input[name="keyword"]').val();

        if (sortBy == 'order_num') {
            data = {
                serialNum: serialNum,
                keyWord: keyWord,
                orderNum: sortMode,
                page: page
            }
        }
        else {
            data = {
                serialNum: serialNum,
                keyWord: keyWord,
                consume: sortMode,
                page: page
            }
        }

        service
        .getCouponFreeStudent(data)
        .done(function (response) {
            if (response.code == 0) {

                var items = response.data.tpl.student_list;
                var list = $(items).find('table tr');
                var pager = $(items).find('.pager-block');
                var noData = $(items).find('.no-data');

                if (list.length > 0) {
                    dataContainer.html(list);
                    pagerContainer.html(pager);
                }
                else {
                    container.find('.student_list').html(noData);
                }

                if ($.isFunction(callback)) {
                    callback();
                }

            }
        });

    }

    exports.init = function () {

        serialNum = store.get('serialNum');

        var sortMap = {
            'order_num': 'desc',
            'consume': 'desc'
        };

        loadData(1, null);

        container
        .on('click', '.btn-search', function (e) { // 点击搜索

            var target = $(e.currentTarget);
            var searchForm = target.closest('.search-form');
            var keyword = searchForm.find('input[name="keyword"]').val();

            loadData(0, lastSortBy, lastSortMode);

        })

        .on('click', '#select-all', function (e) { // 全选

            var target = $(e.currentTarget);
            if (target.prop('checked')) {
                dataContainer
                .find('input[name="student_number"]')
                .each(function (index, item) {
                    $(item).prop('checked', true);
                });
            }
            else {
                dataContainer
                .find('input[name="student_number"]')
                .each(function (index, item) {
                    $(item).prop('checked', false);
                });
            }
            // 计算已选择学员数
            countChoicedStudent();
        })

        .on('click', 'input[name="student_number"]', function () {
            // 计算已选择学员数
            countChoicedStudent();
        })

        .on('click', '.sort', function (e) { // 排序
            var target = $(e.currentTarget);
            var sortBy = target.data('by');
            var sortMode = target.data('mode');

            loadData (0, sortBy, sortMode, function () {

                // 重置当前项排序方式
                if (sortMode == 'asc') {
                    target.data('mode', 'desc');
                }
                else {
                    target.data('mode', 'asc');
                }
                // 记录用户最后选择的排序方式
                lastSortBy = sortBy;
                lastSortMode = sortMode;
            });

        })

        .on('click', '.pager [data-page]', function () { // 点击分页

            curPage = $(this).data('page');
            loadData(curPage, lastSortBy, lastSortMode);

            return false;
        });

        // 发送优惠券领取页链接
        var sendButton = new SaveButton({
            element: container.find('.btn-send'),
            save: function () {

                var studentNumArr = [];

                dataContainer
                .find('input[name="student_number"]')
                .each(function (index, item) {
                    if ($(item).prop('checked')) {
                        studentNumArr.push($(item).val());
                    }
                });

                var serialNumArr = [serialNum];

                if (studentNumArr.length) {
                    return service
                    .sendCoupon(
                        {
                            serialNum: serialNumArr,
                            studentNum: studentNumArr
                        }
                    )
                    .done(function (response) {

                        if (response.code === 0) {
                            success('发送成功', function(){
                                location.reload();
                            });
                        }
                    });
                }
                else {
                    alert('请选择需要发送优惠券的学生');
                }

            }
        });

    };


});