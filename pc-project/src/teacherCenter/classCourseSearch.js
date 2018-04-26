/**
 * @file 班课列表 容器 加载
 * @author liucong
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var Dialog = require('cobble/ui/Dialog');
    var cookie = require('cobble/util/cookie');
    var classCourseSearchList = require('teacherCenter/course/classCourseSearchList');
    var classCourseSearchForm = require('teacherCenter/course/classCourseSearchForm');
    var dateUtil = require('cobble/util/date');
    var Tooltip = require('cobble/ui/Tooltip');

    var container = $('.tab-content');
    var dataContainer = container.find('#class-course-list tbody');
    var pagerContainer = container.find('#class-course-list .pager-container');
    var loading = container.find('.loading');
    var noResult = container.find('.no-result');

    var formData;

    var iconClassMap = {
        'asc': [
            'icon-arrow-up-o',
            'icon-arrow-up'
        ],
        'desc': [
            'icon-arrow-down-o',
            'icon-arrow-down'
        ]
    };

    var curSortByElement;
    var curPage = 0;
    var curSortBy;

    /**
     * 加载数据
     * @param  {number}   page      页数
     * @param  {string=}   sortBy   排序项 默认按价格升序
     * @param  {Function=} callback 成功后的回调
     */
    function loadData(sortBy, callback) {

        var data = {};
        dataContainer.html('');
        pagerContainer.html('');
        loading.show();

        $.extend(data, formData, {
            page: curPage,
            sortBy: sortBy,
            size: 10
        });

        service
        .getClassCourseList(data)
        .done(function (response) {

            if (response.code === 0) {

                var items = response.data.tpl.class_course_list;
                var list = $(items).find('table tr');
                var pager = $(items).find('.pager-block');

                if (list.length > 0) {

                    noResult.hide();

                    loading.hide();

                    dataContainer.append(list);//供后端使用模板文件 teacher_center/component/classCourseSearchListItems.html

                    pagerContainer.html(pager);

                    Tooltip.init(container.find('[data-title]'));

                    if ($.isFunction(callback)) {
                        callback();
                    }
                }
                // 若当前页码没有数据，而又不是第一页，就再次获取上一页的数据。
                else if (curPage > 1) {

                    curPage -= 1;

                    loadData(sortBy, callback);

                }
                else {

                    loading.hide();

                    noResult.show();
                }
            }
        });
    }

    //获取反向排序名称
    function getReversedOrder(order) {

        if (!(order != 'asc' || order != 'desc')) return '';

        return order == 'asc' ? 'desc' : 'asc';
    }

    /**
     * 获取sort_by字段
     * @param  {Object jq}  element    sortBy元素
     * @param  {boolean} isReversed 是否获取反向排序
     * @return {string}  sort_by字段
     */
    function getSortBy(element, isReversed) {
        if (!element) return null;

        var sortBy = element.data('field');
        var order = isReversed ? getReversedOrder($(element).data('order')) : $(element).data('order');

        return sortBy + '-' + order;
    }

    /**
     * 重置排序列头
     * @param  {boolean} isKeepCurrent 是否保留当前排序项
     */
    function resetSort(isKeepCurrent) {
        container
        .find('table .sort')
        .each(function (index, item) {
            if (isKeepCurrent && item == curSortByElement[0]) return true;

            var icon = $(item).find('.icon');
            var order = $(item).data('orgin-order');

            icon.removeClass(iconClassMap['asc'][0] + ' ' + iconClassMap['asc'][1]);
            icon.removeClass(iconClassMap['desc'][0] + ' ' + iconClassMap['desc'][1]);
            $(item).removeClass('active');

            icon.addClass(iconClassMap[order][0]);
            $(item).data('order', order);
        });

    }
    var appleTpl =
             '<div class="apple-dialog"> '
        +       '<div class="apple-content">即日起，通过苹果设备APP学币购买付费直播课、视频课将收取一定比例的苹果渠道费。</div>'
        +       '<div class="apple-action">'
        +           '<button class="btn-primary btn-continue">继续开课</button>'
        +           '<a href="http://bbs.genshuixue.com/forum/postBrowse/14105" target="_blank" class="btn-default">查看详情</a href="www">'
        +           '<label class="no-tips"><input type="checkbox" text="">不再提示</label>'
        +       '</div>'
        +    '</div>';

    exports.init = function () {

        classCourseSearchForm.init();
        classCourseSearchList.init(container);

        resetSort(); //整体用初始值赋值data-order

        curPage = 1;
        loadData();

        container
        // 排序
        .on('click', 'table .sort', function () {

            var el = $(this);
            var sortBy = getSortBy(el, el.hasClass('active'));
            var originOrder = el.data('orgin-order');

            curPage = 0;
            curSortBy = sortBy;

            loadData(curSortBy, function () {
                curSortByElement = el;
                var icon = curSortByElement.find('.icon');

                if (curSortByElement.hasClass('active')) {
                    //翻转icon

                    icon.toggleClass(iconClassMap['asc'][1]);
                    icon.toggleClass(iconClassMap['desc'][1]);

                    //翻转data-order
                    curSortByElement.data('order', getReversedOrder(curSortByElement.data('order')));
                }
                else {
                    curSortByElement.addClass('active');

                    icon.removeClass(iconClassMap['asc'][0] + ' ' + iconClassMap['asc'][1]);
                    icon.removeClass(iconClassMap['desc'][0] + ' ' + iconClassMap['desc'][1]);

                    icon.addClass(iconClassMap[originOrder][1]);
                }

                resetSort(true); //保留当前排序项 重置其他
            });
        })
        // 搜索
        .on('search', function (e, data) {

            formData = data;
            if (formData.subject == '-1') { //-1表示全部类目，便不上送此参数
                delete formData.subject;
            }
            if (formData.search_status == '-1') { //-1表示全部类目，便不上送此参数
                delete formData.search_status;
            }
            curPage = 1;
            loadData(null, function () {
                resetSort(); //重置所有排序项
            });
        })
        // 分页
        .on('click', '.pager [data-page]', function () {

            curPage = $(this).data('page');
            loadData(getSortBy(curSortByElement));

            return false;
        })
        // 刷新
        .on('reload', function () {
            loadData(curSortBy);
        });

    };

});