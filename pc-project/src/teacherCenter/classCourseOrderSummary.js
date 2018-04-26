/**
 * @fileOverview 班课订单汇总
 * @author liucong
 */
define(function (require, exports) {

    'use strict';
    var etpl = require('cobble/util/etpl');
    var store = require('common/store');
    var moment = require('moment');
    var service = require('common/service');
    var formUtil = require('common/form');
    var Select = require('cobble/form/Select');
    var baiduMap = require('common/map/baidu');
    var Dialog = require('cobble/ui/Dialog');
    var json = require('cobble/util/json');
    var EnterClassroomDialog = require('common/center/component/EnterClassroomDialog');
    var Tooltip = require('cobble/ui/Tooltip');
    var org_id = '';
    var scheduleTpl = ''
        +   '<!-- for:${schedules} as ${schedule} -->'
        +   '<dl data-index="${schedule.index}">'
        +       '<dt>第${schedule.index}节</dt>'
        +       '<dd>'
        +           '<div class="column-left">'
        +               '<div class="row">'
        +                   '<div>'
        +                       '<label>课程时间：</label>${schedule.period}'
        +                   '</div>'
        +                   '<div>'
        +                       '<label>主讲老师：</label>${schedule.teacher_display_name}'
        +                   '</div>'
        +               '</div>'
        +               '<div class="row">'
        +                   '<label>课程内容：</label>'
        +                   '<span class="schedule-content" data-title="${schedule.content}" data-width="400">'
        +                       '<span>${schedule.content}</span>'
        +                   '<span>'
        +               '</div>'
        +           '</div>'
        +           '<div class="column-right">'
        +               '<!-- if:${schedule.lesson.row_operation.actions.enter_classroom} && !${schedule.lesson.row_operation.actions.enter_classroom.disabled} -->'
        +               '<div data-online=\'${schedule.onlineDataJson}\' target="_blank" class="btn-success">进入教室</div>'
        +               '<!-- else -->'
        +               '<div>${schedule.lesson.row_operation.label}</div>'
        +               '<!-- /if -->'
        +           '</div>'
        +       '</dd>'
        +   '</dl>'
        +   '<!-- /for -->';

    var orderGroup = [
        { text: '全部状态', value: 'ALL' },
        { text: '待支付', value: 'WAITING_FOR_PAY' },
        { text: '进行中', value: 'WIP' },
        { text: '待评价', value: 'COMMENT' },
        { text: '已取消', value: 'CANCELED' }
    ];

    function getPeriod(begin, end) {
        begin = moment(begin * 1000);
        end = moment(end * 1000);

        return begin.format('YYYY-MM-DD')
            +   ' '
            +   begin.format('HH:mm') + ' - '
            +   end.format('HH:mm');
    }

    function loadOrderList(form, container, page) {
        if (!page) page = 1;

        var data = formUtil.parse(form);
        $.extend(data, {
            page: page,
            number: store.get('courseNumber')
        });

        service
        .getClassCourseOrderList(data)
        .done(function (response) {
            if (response.code === 0) {
                var tpl = response.data.tpl;

                container.html(tpl.order_list);

                container
                .find('[data-title]')
                .each(function (index, item) {
                    Tooltip.init($(this));
                });

                // 处理QA提出的右键新页面打开某页的白屏问题
                container.find('.pager a').each(function () {
                    var span = $('<span>');
                    var $a = $(this);
                    if ($a.hasClass('active')) {
                        span.addClass('active');
                    } else {
                        span.attr('data-page', $a.attr('data-page'));
                    }
                    span.html($a.html());
                    $a.replaceWith(span);
                });
            }
        })
    }

    function formatSchedule(isRecently, schedules) {

        var i = 0;
        return $.map(schedules, function (item, index) {
            i++;
            if (!isRecently || item.recently) {
                return $.extend({
                    index: i,
                    onlineDataJson: item.lesson ? json.stringify(item.lesson.online_data) : '',
                    period: getPeriod(item.begin_time, item.end_time)
                }, item);
            }
        });
    }

    function initTooltip(element) {
        element && element.each(function (index, item) {
            if ($(this).find('span').innerWidth() > $(this).innerWidth()) {
                Tooltip.init($(this));
            }
        })
    }

    exports.init = function () {

        service
        .getUserBasicInfo()
        .done(function (response) {
            if (response.code === 0) {
                org_id = response.data.org_id;
            }
        });

        var container = $('#main');
        var form = container.find('.search.form');
        var orderListContainer = container.find('.enroll .order-list');
        var schedulesListContainer = container.find('.schedule-list');

        var schedules = store.get('schedules');
        var number = store.get('courseNumber');
        var enrollCount = Number(store.get('enrollCount'));

        var recently = formatSchedule(true, schedules);

        var recentlyHtml = etpl.compile(scheduleTpl)({
            schedules: recently
        });

        schedulesListContainer.html(recentlyHtml);
        initTooltip($('.schedule-list [data-title]'));

        var allSchedule;
        var allScheduleHtml;

        var groupSelect = new Select({
            element: container.find('.group-select'),
            data: orderGroup,
            name: 'group'
        });

        groupSelect.setValue('ALL');


        if (enrollCount > 0) {
            loadOrderList(form, orderListContainer);
        }

        var mapDialog;

        container
        .on('click', '.goto-roster', function (e) {
            var target = $(e.currentTarget);
            var price = target.data('price');
            var way = target.data('way');
            if(way == 2) {
                if(price == 0) {
                    if(store.get('vip_level') == 0) {
                        if(org_id == 0) {
                            alert({
                                title: '温馨提示',
                                content: '免费课花名册只有会员才能查看，会员还可享有优先推荐获得更多生源哦。',
                                width: 382,
                                skinClass: "vip_dialog",
                                buttons: [
                                    {
                                        text: '立即开通',
                                        type: 'error',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_center";
                                            this.hide();
                                        }
                                    },
                                    {
                                        text: '了解详情',
                                        type: 'default',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_detail?type=seeRoster";
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        else {
                            alert({
                                title: '温馨提示',
                                content: '免费课花名册只有会员才能查看，请联系机构开通会员',
                                width: 382,
                                skinClass: "vip_dialog",
                                buttons: [
                                    {
                                        text: '我知道了',
                                        type: 'primary',
                                        handler: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        return false;
                    }
                    else if (store.get('vip_level') == 1) {
                        if(org_id == 0) {
                            alert({
                                title: '温馨提示',
                                content: '免费直播课花名册只有高级会员才能查看，高级会员还可享有优先推荐获得更多生源哦。',
                                width: 382,
                                skinClass: "vip_dialog",
                                buttons: [
                                    {
                                        text: '立即开通',
                                        type: 'error',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_center";
                                            this.hide();
                                        }
                                    },
                                    {
                                        text: '了解详情',
                                        type: 'default',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_detail?type=seeRoster";
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        else {
                            alert({
                                title: '温馨提示',
                                content: '免费直播课花名册只有高级会员才能查看，请联系机构开通超级会员',
                                width: 382,
                                skinClass: "vip_dialog",
                                buttons: [
                                    {
                                        text: '我知道了',
                                        type: 'primary',
                                        handler: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }

                        return false;
                    }
                }
            }
            else if (way == 4) {
                if(price == 0) {
                    if(store.get('vip_level') == 0) {
                        if (org_id == 0) {
                            alert({
                                title: '温馨提示',
                                content: '免费课花名册只有会员才能查看，会员还可享有优先推荐获得更多生源哦。',
                                width: 382,
                                skinClass: "vip_dialog",
                                buttons: [
                                    {
                                        text: '立即开通',
                                        type: 'error',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_center";
                                            this.hide();
                                        }
                                    },
                                    {
                                        text: '了解详情',
                                        type: 'default',
                                        handler: function () {
                                            location.href = "/teacher_center/vip_detail?type=seeRoster";
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        else {
                            alert({
                                title: '温馨提示',
                                content: '免费课花名册只有会员才能查看，请联系机构开通会员',
                                width: 382,
                                skinClass: "vip_dialog",
                                buttons: [
                                    {
                                        text: '我知道了',
                                        type: 'primary',
                                        handler: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });
                        }
                        return false;
                    }
                }
            }
        })
        .on('click', '.schedule .expand-collapse > div', function () {

            var expandCollapse = $(this).closest('.expand-collapse');

            if ($(this).is('.expand')) {
                if (!allSchedule) {
                    allSchedule = formatSchedule(false, schedules);
                    allScheduleHtml = etpl.compile(scheduleTpl)({
                        schedules: allSchedule
                    });
                }

                schedulesListContainer.html(allScheduleHtml);
                expandCollapse.addClass('expanded');
            }
            else {
                schedulesListContainer.html(recentlyHtml);
                expandCollapse.removeClass('expanded');
            }

            initTooltip($('.schedule-list [data-title]'));
        })
        .on('click', '.enroll .actions .close', function () {
            $(this)
            .closest('.actions')
            .slideUp(100);
        })
        .on('click', '.manual-op .open-class', function (e) {

            confirm({
                title: '温馨提示',
                content: '确认开班后，班课将会如期进行，无法中途取消</br>是否确认开班？'
            })
            .done(function () {
                service
                .statusClassCourse({
                    number: number,
                    op: 'open'
                })
                .done(function (response) {
                    if (response.code === 0) {
                        location.reload();
                    }
                })
            });
        })
        .on('click', '.manual-op .close-class', function (e) {

            confirm({
                title: '温馨提示',
                content: '关闭班级后，小秘书将会帮你取消所有学生的订单，该操作不可恢复</br>是否确定关闭班级？'
            })
            .done(function () {
                service
                .statusClassCourse({
                    number: number,
                    op: 'close'
                })
                .done(function (response) {
                    if (response.code === 0) {
                        location.reload();
                    }
                })
            });
        })
        .on('click', '.enroll .submit', function () {
                loadOrderList(form, orderListContainer);
        })
/*        .on('submit', '.enroll form', function (e) {
            e.stopPropagation();
            loadOrderList(form, orderListContainer);
            return false;
        })*/
        .on('click', '.enroll [data-page]', function () {
            var page = $(this).data('page');
            loadOrderList(form, orderListContainer, page);
            return false;
        })
        .on('click', '.map', function() {
            if (mapDialog) {
                mapDialog.show();
            } else {
                var offline = $(this).data('offline');
                var map = '<div id="map" style="height:400px;"></div>';
                mapDialog = new Dialog({
                    title: '上课地点',
                    content: map,
                    disposeOnHide: false,
                    width: 600,
                    onBeforeShow: function(){
                        baiduMap.modifiedAddress('map', offline.lng, offline.lat);
                    }
                });
            }
        })
        .on('click', 'dd [data-online]', function () {
            var data = $(this).data('online');
                new EnterClassroomDialog({
                    data: data
                });
        });
    }
});