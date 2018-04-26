/**
 * @file 直播设置
 * @author wangyujie
 */
define(function (require, exports, module) {

    'use strict';

    var Popup = require('custom/helper/Popup');
    var Validator = require('custom/form/Validator');
    var service = require('../../offlineCourseEdit/service');
    var org_id = '';

    var NO_APPOINTMENT = 0;
    var IS_APPOINTMENT = 1;

    /*
     * 格式化空间大小
     *
     * @param {?number} size 字节大小
     */
    function formateSize (size) {
        if (size == null) {
            size = 0;
        }
        var result = 0;
        if (size / 1024 / 1024 / 1024 >= 1) {
            result = (size / 1024 / 1024 / 1024).toFixed(1) + 'G';
        }
        else if (size / 1024 / 1024 >= 1) {
            result = (size / 1024 / 1024).toFixed(1) + 'M';
        }
        else if (size / 1024 >= 1) {
            result = (size / 1024).toFixed(1) + 'K';
        }
        else {
            result = size + 'B';
        }

        return result;
    }

    /**
     * 直播课的直播设置
     *
     * @param {Object} options
     * @property {?String} options.auditionFlag 是否需要试听
     * @property {?String} options.auditionTime 试听时间
     * @property {?String} options.playbackToVideo 回放自动转为视频课
     * @property {?String} options.freeDataSize 剩余存储空间
     * @property {?String} options.offerReplayCheck 提供回放
    **/
    return Ractive.extend({
        template: require('html!./OnlineRelatedSetting.html'),
        data: function (data) {
            return {
                style: require('text!./OnlineRelatedSetting.styl'),
                auditionInputOptions: {
                    name: 'auditionTime',
                    value: 0,
                    placeholder: '最多60',
                    className: 'audition-input'
                },
                playbackInputOptions: {
                    name: 'playbackTime',
                    value: 0,
                    placeholder: '最长365',
                    className: 'playback-input',
                    disabled: false
                },
                NO_APPOINTMENT: NO_APPOINTMENT,
                IS_APPOINTMENT: IS_APPOINTMENT,
                appointmentDisabled: false,
                playbackToVideo: false,
                playbackToVideoDisabled: false,
                freeDataSize: 0,
                autoPlaybackRecord: false,
                options: {
                    auditionFlag: '',
                    auditionTime: '',
                    playbackTime: '',
                    playbackToVideo: 0,
                    freeDataSize: '',
                    autoPlaybackRecord: 0
                }
            };
        },
        computed: {
            isAppointment: {
                get: function () {
                    return this.get('appointmentDisabled')
                        ? NO_APPOINTMENT
                        : IS_APPOINTMENT;
                },
                set: function (checked) {
                    var me = this;
                    var data = { };
                    if (checked) {
                        if (!me.get('options.auditionTime')) {
                            data['auditionInputOptions.value'] = 5;
                            data['auditionInputOptions.focus'] = true;
                        }
                        data['auditionInputOptions.disabled'] = false;
                        data['appointmentDisabled'] = false;
                    }
                    else {
                        data['auditionInputOptions.value'] = '';
                        data['auditionInputOptions.disabled'] = true;
                        data['appointmentDisabled'] = true;
                    }
                    me.set(data)
                    .then(function () {
                        if (me.validator) {
                            me.validator.validate('auditionTime');
                        }
                    })
                }
            }
        },
        components: {
            Input: require('../../../../common/component/Input'),
        },
        onrender: function () {

            var me = this;
            var container = $(me.getElement());

            // 提供回放
            var autoPlaybackRecord = me.get('options.autoPlaybackRecord');
            me.set({
                autoPlaybackRecord: autoPlaybackRecord == 1 ? true : false
            });
            me.observe('autoPlaybackRecord', function (value) {
                if (value) {
                    me.set('playbackInputOptions.disabled', false);
                }
                else {
                     me.set('playbackInputOptions.disabled', true);
                }
            });

            // 回放自动转为视频课
            var playbackToVideo = me.get('options.playbackToVideo');
            me.set({
                playbackToVideo: playbackToVideo == 1 ? true : false
            });

            me.bindData({
                'auditionInputOptions.value': 'options.auditionTime',
                'playbackInputOptions.value': 'options.playbackTime',
                'isAppointment': 'options.auditionFlag',
                'playbackToVideoDisabled': 'options.playbackToVideoDisabled',
                'freeDataSize': 'options.freeDataSize'
            });

            var container = $(me.getElement());
            me.validator = new Validator({
                mainElement: container,
                validateOnBlur: true,
                fields: {
                    auditionTime: {
                        rules: {
                            required: true,
                            pattern: /^\d+$/,
                            min: 1,
                            max: 60
                        },
                        errors: {
                            required: '请填写试听时长',
                            pattern: '请输入1-60的整数',
                            min: '请输入1-60之间的整数',
                            max: '请输入1-60之间的整数'
                        }
                    },
                    playbackTime: {
                        rules: {
                            required: true,
                            pattern: /^\d+$/,
                            min: 1,
                            max: 365
                        },
                        errors: {
                            required: '请填写回放有效期',
                            pattern: '请输入1-365的整数',
                            min: '请输入1-365之间的整数',
                            max: '请输入1-365之间的整数'
                        }
                    }
                }
            });

            me.observe('auditionInputOptions.focus', function (focus) {
                if (focus) {
                    var value = me.get('auditionInputOptions.value');
                    var data = {};
                    if (value == null) {
                        data['auditionInputOptions.value'] = 5;
                    }
                    data['isAppointment'] = 1;
                    me.set(data)
                    .then(function () {
                        me.validator.validate('auditionTime');
                    });
                }
            });

            me.observe('playbackToVideo.blur', function (blur) {
                if (blur) {
                    me.judgeMember();
                }
            });
        },
        toVideoBlur: function () { // 回放自动转为视频课
            var me = this;
            // 已开课，不可修改
            if (me.get('playbackToVideoDisabled')) {
                return;
            }
            else {
                var freeDataSize = me.get('freeDataSize');

                if (freeDataSize > 0) {
                    // 时间计算：xxxMB/100=xx小时
                    var freeTime = (freeDataSize / 1024 / 1024 / 100).toFixed(1) + '小时';

                    var content = '<div style="text-align: left">选择自动生成回放视频课后，每节直播课都需要手动开启云端录制，'
                                    + '<br>请确保有足够的云资料空间。'
                                    + '<br><br>现有空余资料空间：<span class="primary">' + formateSize(freeDataSize) + '</span>'
                                    + '<br>预计可录制课程时长：<span class="primary">' + freeTime + '</span>左右</div>';
                    alert({
                        title: '温馨提示',
                        content: content,
                        width: 450,
                        buttons: [
                            {
                                text: '继续',
                                type: 'primary',
                                action: function () {
                                    this.hide();
                                    me.set({
                                        'playbackToVideo': true,
                                        'options.playbackToVideo': 1
                                    });

                                }
                            },
                            {
                                text: '取消',
                                type: 'default',
                                action: function () {
                                    this.hide();
                                    /*
                                    me.set({
                                        'playbackToVideo': false,
                                        'options.playbackToVideo': 0
                                    });
                                    */
                                }
                            }
                        ],
                        onbeforehide: function () {
                            me.set({
                                'playbackToVideo': false,
                                'options.playbackToVideo': 0
                            });
                        }
                    });
                }
                else {
                    alert({
                        title: '温馨提示',
                        content: '您的存储空间已满，无法进行课程录制',
                        width: 360,
                        buttons: [
                            {
                                text: '取消',
                                type: 'default',
                                action: function () {
                                    this.hide();
                                }
                            },
                            {
                                text: '扩容',
                                type: 'primary',
                                action: function () {
                                    this.hide();
                                    location.href = '/teacher_center/storage_space';
                                }
                            }
                        ],
                        onbeforehide: function () {
                            me.set({
                                'playbackToVideo': false,
                                'options.playbackToVideo': 0
                            });
                        }
                    });
                }
            }
        },
        autoPlaybackRecordBlur: function () { // 提供回放
            var me = this;
            if (me.get('options.autoPlaybackRecord') == 1) {
                alert({
                    title: '温馨提示',
                    content: '为学生提供回放可以提高学生满意度，同时提高学生的复购哦，建议您开启云端录制来录制回放哦',
                    width: 360,
                    buttons: [
                        {
                            text: '立即开启',
                            type: 'primary',
                            action: function () {
                                this.hide();
                                me.set({
                                    'autoPlaybackRecord': true,
                                    'options.autoPlaybackRecord': 1
                                });
                            }
                        },
                        {
                            text: '暂不录制',
                            type: 'default',
                            action: function () {
                                this.hide();
                                me.set({
                                    'autoPlaybackRecord': false,
                                    'options.autoPlaybackRecord': 0
                                });
                            }
                        }
                    ]
                });
            }
            else {
                me.set({
                    'autoPlaybackRecord': true,
                    'options.autoPlaybackRecord': 1
                });
            }

        },
        validate: function () {
            return this.validator.validate(true);
        },
        getData: function () {
            var me = this;
            var data = { };

            if (me.get('options.auditionFlag')) {
                data.trial_minutes = me.get('options.auditionTime');
            }
            if (me.get('options.autoPlaybackRecord')) {
                data.playback_expire_day = +me.get('options.playbackTime');
            }

            data.auto_playback_record = me.get('options.autoPlaybackRecord');
            data.playback_to_video = me.get('options.playbackToVideo');
            data.free_data_size = me.get('freeDataSize');
            return data;
        }
    });

});