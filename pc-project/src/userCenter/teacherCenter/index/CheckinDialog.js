/*
 * @file 签到弹窗
 * @author wangyujie
 */
define(function (require, exports) {

    var ractiveDialog = require('../../common/function/ractiveDialog');
    var SignCalendar = require('./SignCalendar');

    var checkinDialog;
    var calContainer;

    /**
     * 初始化签到日历组件
     * @return
     */
    var calendarTable; // 日历中tr数目
    var countTr;

    var initCalendar = function () {

        calContainer = $('.dialog').find('.sign-calendar');

        if (!calContainer.length) {
            return;
        }

        var today = new Date();
        var date = today.getDate();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;

        var url = (location.href.split('?'))[0];

        var calendar = new SignCalendar({
            element: calContainer,
            today: today,
            date: today,
            value: ''
                    + today.getFullYear()
                    + '-'
                    + ((month < 10) ? ('0' + month) : month)
                    + '-'
                    + ((date < 10 ) ? ('0' + date) : date),
            onafterrender: function () {
                // 几行日历
                /*
                calendarTable = calContainer.find('table');
                countTr = calendarTable.find('tr').length;
                checkinDialog.refresh();
                */
            }
        });
        return calendar;
    };

    /**
     * @param {Object} options
     * @property {Object} options.data ajax数据
     * @property {Function=} options.onsave
     * @property {Function=} options.oncancel
     */
    return function (options) {

        options = options || {};

        checkinDialog = ractiveDialog({
            template: require('html!./CheckinDialog.html'),
            data: {
                style: require('text!./CheckinDialog.styl'),
                siteSource: siteData.source,
                checkinData: options.data.checkin,
                emotions: {
                    '11': '微笑',
                    '12': '好困',
                    '13': '得意',
                    '14': '撇嘴',

                    '21': '憨笑',
                    '22': '大哭',
                    '23': '调皮',
                    '24': '疑问',

                    '31': '惊讶',
                    '32': '厉害',
                    '33': '崇拜',
                    '34': '奋战',

                    '41': '晕',
                    '42': '色',
                    '43': '无语',
                    '44': '衰',
                },
                emotionValue: 0, // 签到表情
                moodInputOptions: {
                    name: 'mood',
                    value: '',
                    placeholder: '今天的心情如何？说上两句...',
                    className: 'mood-textarea',
                    multiple: true,
                    lazy: true
                },
                noValue: false, // 心情描述
                tooLong: false,
                showOneCheckin: { // 当前悬浮展示签到内容
                    emotion: '',
                    text: '',
                    time: ''
                }
            },
            components: {
                Input: require('../../common/component/Input')
            },
            onrender: function () {
                // 已签到，渲染日历
                if (this.get('checkinData.today.has_checkin')) {

                    initCalendar();

                    // 签到表情展示
                    calContainer
                    .on('mouseenter', 'table td', function (e) {

                        var element = $(this);
                        var targetTr = element.closest('tr');
                        element.addClass('active');

                        var oneday = calContainer.find('.oneday');
                        oneday.hide();

                        if (element.data('mood')) {
                            oneday.find('img').attr('src', '/asset/img/im/expression-' + element.data('mood') + '.png');
                            if (element.data('text')) {
                                oneday.find('.checkin-text').text(element.data('text'));
                            }
                            else {
                                oneday.find('.checkin-text').html('<span>你太懒了，都没有留下心情~</span>');
                            }

                            oneday.find('.checkin-time').text(element.data('time'));

                            // 定位oneday的显示位置
                            var bottomPos = (countTr - targetTr[0].rowIndex) * 57;
                            oneday.css('bottom', bottomPos + 'px');

                            oneday.show();
                        }
                    })

                    .on('mouseleave', 'table td', function (e) {
                        var element = $(this);
                        element.removeClass('active');

                        calContainer.find('.oneday').hide();
                    });

                }
            },
            selectEmotion: function (value) { // 选择表情
                this.set('emotionValue', value);
                this.set('noValue', false);
            },
            checkinAction: function () { // 签到
                var mood = this.get('emotionValue');
                var text = this.get('moodInputOptions.value');

                // 表情必选
                if (mood == '') {
                    this.set('noValue', true);
                    return;
                } else {
                    this.set('noValue', false);
                }

                // 心情最多140字，非必填
                if (text.length > 140) {
                    this.set('tooLong', true);
                    return;
                } else {
                    this.set('tooLong', false);
                }

                if ($.isFunction(options.onsave)) {
                    options.onsave({
                        mood: mood,
                        text: text
                    });
                    checkinDialog.hide();
                }
            }
        });

        return checkinDialog;

    };

});
