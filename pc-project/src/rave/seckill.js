/**
 * @file 秒杀活动区
 * @author  zengcheng
 */

define(function (require, exports) {

    var store = require('common/store');
    var ClockTimer = require('./ClockTimer');
    var LoginDialog = require('common/component/LoginDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');

    var rave, clockTimer;
    var secWrapper = $('#sec-kill-wrapper');
    var currentSec = secWrapper.find('.current-sec');
    var nextSec = secWrapper.find('.next-sec');
    var timeline = secWrapper.find('.time-tip-list');
    var secClock = secWrapper.find('.sec-kill-time-tip');

    //高亮当前秒杀时间段
    function highlight(list, filterSel, highlightCls) {
        list.removeClass(highlightCls);
        list.filter(filterSel).addClass(highlightCls);
    }

    //显示秒杀倒计时
    function showTime(number) {
        var numberStr = number >= 10 ? ('' + number) : ('0' + number);
        return '<em>' +  numberStr.substring(0, 1) +'</em><em>' + numberStr.substring(1, 2) + '</em>';
    }

    //启动计时期
    function initTimerClock() {
        //活动结束不需要开始计时了
        if (!rave.info.on && rave.info.curr_time > rave.info.start_time) {
            return false;
        }
        if (rave.info.on && rave.info.curr_hour == 21 && rave.info.count <=0) {
            return false;
        }
        clockTimer = new ClockTimer(
            {
                current: rave.info.curr_time,
                start: rave.info.on ? (rave.info.start_time + ((rave.info.curr_hour - 10) * 60 * 60 * 1000)) : rave.info.start_time,
                noleave: rave.info.on ? (rave.info.count <=0) : false,
                onnext: function (current) {
                    $('.sec-time-hour', secClock).html(showTime(current.hour >= 100 ? 99 : current.hour));
                    $('.sec-time-min', secClock).html(showTime(current.min));
                    $('.sec-time-sec', secClock).html(showTime(current.sec));
                },
                onend: function (newSec) {
                    var info = rave.info;
                    if (newSec) {
                        if (info.curr_hour == 21) {
                            window.location.reload();
                        }
                        //下一轮活动开始
                        info.count = 1;//任意非0值开始
                        info.curr_hour = (+info.curr_hour) + 1;
                        info.curr_time = info.start_time + (info.curr_hour - 10) * 3600000  + 1;
                        resetNextSec();
                        this.reset(
                            {
                                current: info.curr_time,
                                start: info.curr_time - 1
                            }
                        );
                    }
                    else {
                        //活动刚好结束
                        if (info.on) {
                            window.location.reload();
                        }
                        //刚好到10点开始
                        else {
                            info.on = true;
                            info.curr_hour = 10;
                            info.curr_time = info.start_time + 1;
                            resetNextSec();
                            this.reset(
                                {
                                    current: info.curr_time,
                                    start: info.curr_time - 1
                                }
                            );
                        }
                    }
                }
            }
        );
    }

    //修正当秒杀轮的按钮的状态
    function fixedCurrentSecBtn() {
        var info = rave.info;
        var filterSel = '[data-hour="' + rave.info.curr_hour + '"]';
        var currentList = currentSec.find('.course-list').filter(filterSel);
        var currentListBtns = currentList.find('.course-sec-btn');
        var joinNumber = currentList.find('.join-number');
        var endTime =  info.start_time + (info.curr_hour - 10) * 3600 * 1000 + 1800 * 1000;
        var secover = (info.curr_time >= endTime);
        if (info.on) {
            if (secover) {
                joinNumber.hide();
                currentListBtns.removeClass('active').html('已经结束');
            } else {
                $.each(currentListBtns, function (index, btn) {
                    if ($(btn).data('out') == 1) {
                        $(btn).removeClass('active').html('你来晚了');
                    }
                    else {
                        $(btn).addClass('active')
                            .html('我要秒杀<span class="icon icon-lightning"></span>');
                    }
                });
            }
        }
        else if (info.curr_time > info.start_time) {
            joinNumber.hide();
            currentListBtns.removeClass('active').html('已经结束');
        }
        else {
            currentListBtns.removeClass('active').html('尚未开始');
        }
    }

    //初始化时间轴
    function initTimeline() {
        //初始化当前活动和下期活动
        //高亮并显示当前活动
        var highlightCurrent = rave.info.curr_hour;
        var highlightNext = highlightCurrent + 1;
        if (!rave.info.on) {
            if (rave.info.curr_time > rave.info.start_time) {
                highlightCurrent = 21;
                highlightNext = 20;
            } else {
                highlightCurrent = 10;
                highlightNext = 11;
            }
        } else {
            if (rave.info.curr_hour == 21) {
                highlightNext = 20;
            }
        }
        var filterSel = '[data-hour="' + highlightCurrent + '"]';
        var nextFilterSel = '[data-hour="' + highlightNext + '"]';
        highlight(currentSec.find('.course-list'), filterSel, 'show');
        //高亮并显示下期活动
        highlight(nextSec.find('.course-list'), nextFilterSel, 'show');

        //高亮时间轴
        var timeItems = timeline.find('.sec-tip-item');
        //当前活动时间轴高亮
        highlight(timeItems, filterSel, 'current');

        if (rave.info.on) {
            timeItems.filter(filterSel).find('.index-tip').text('NOW');
        }
        //下场活动时间轴高亮
        highlight(timeItems, nextFilterSel, 'next');
        if (rave.info.on || rave.info.curr_time <= rave.info.start_time) {
            if (rave.info.on && +rave.info.curr_hour < 21) {
                timeItems.filter(nextFilterSel).find('.index-tip').text('即将开始');
            }
        }
    }

    //重置秒杀的活动
    function resetNextSec() {
        var filterSel = '[data-hour="' + rave.info.curr_hour + '"]';
        var prevFilterSel = '[data-hour="' + (rave.info.curr_hour - 1) + '"]';
        //修改秒杀文案
        showSecTopTip();

        //初始化时间轴
        timeline.find('.sec-tip-item').filter(prevFilterSel)
            .find('.index-tip')
            .text('第' + (rave.info.curr_hour - 10 || 1) + '弹');
        initTimeline();

        //修改button状态
        currentSec.find('.course-list').filter(filterSel)
            .find('.course-sec-btn')
            .addClass('active')
            .html('我要秒杀<span class="icon icon-lightning"></span>');

        nextSec.find('.course-list').filter(prevFilterSel)
            .find('.course-sec-btn')
            .removeClass('active')
            .html('已经结束');
    }

    //活动顶部显示的文案
    function showSecTopTip() {
        var info = rave.info;
        var tip = secWrapper.find('.sec-kill-tip');
        var attachTimeTip = secWrapper.find('.sec-kill-time-tip');
        var endTime =  info.start_time + (info.curr_hour - 10) * 3600 * 1000 + 1800 * 1000;
        tip.text('');
        attachTimeTip.find('.before').text('');
        attachTimeTip.find('.after').text('');
        if (info.on) {
            if (info.curr_time < endTime) {
                if (info.count >0 ) {
                    attachTimeTip.find('.before').text('仅剩');
                    tip.text('本轮秒杀濒临结束');
                } else {
                    if (info.curr_hour != 21) {
                        attachTimeTip.find('.after').text('后重新开启');
                    } else {
                        attachTimeTip.hide();
                    }
                    tip.text('本轮秒杀瞬间结束');
                }
            }
            else {
                attachTimeTip.find('.after').text('后重新开启');
                tip.text('本轮秒杀瞬间结束');
            }
        }
        else if (info.curr_time > info.start_time) {
            tip.text('今日秒杀已经结束 去看看其他便宜课');
            attachTimeTip.hide();
        }
        else {
            tip.text('秒杀即将开始')
        }
    }

    //预览活动
    exports.init = function () {

        //初始化数据
        rave = store.get('rave');

        //显示秒杀文案
        showSecTopTip();

        //启动倒计时
        initTimerClock();

        //初始化时间轴
        initTimeline();

        //修复按钮状态显示
        fixedCurrentSecBtn();

        //预览过去的秒杀或者之后的秒杀
        timeline.on('mouseover', '.sec-tip-item', function () {
            var that = $(this);
            var dataHour = that.data('hour');
            if (!that.hasClass('current') && !that.hasClass('next')) {
                timeline.find('.sec-tip-item.next').removeClass('next');
                that.addClass('next');
                nextSec.find('.course-list.show').removeClass('show');
                nextSec.find('.course-list[data-hour="' + dataHour + '"]').addClass('show');
            }
        });

        //秒杀按钮
        currentSec.on('click', '.course-sec-btn', function () {
            var that = $(this);
            var number = $(that).parents('.course-item').data('number');
            var user = store.get('user');
            var hasLogin = user.id;
            if (that.hasClass('active')) {
                //是否登录
                if (!hasLogin) {
                    new LoginDialog({
                        zIndex: 100,
                        onSuccess: function () {
                            location.reload();
                        }
                    });
                    return false;
                }
                else if (user.type === 0) {
                    new SwitchRoleDialog({
                        createText: '需要开通学生身份才能参与秒杀哦~现在开通？',
                        switchText: '需要切换学生身份才能参与秒杀哦~现在切换？',
                        switchTo: 'student',
                        onSuccess: function (data) {
                            location.reload();
                        }
                    });
                    return false;
                }
                window.open('/pay/productDetail?course_number=' + number +'&type=2', '_blank');
            }
            return false;
        });

        //跳转课程详情页
        currentSec.on('click', '.course-item', function () {
            window.open('/teacher/classCourseDetail?number=' + $(this).data('number'), '_blank');
        });

        nextSec.on('click', '.course-item', function () {
            window.open('/teacher/classCourseDetail?number=' + $(this).data('number'), '_blank');
        });
    }
});