/**
 * @file 课程详情的预览
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict';

    var VideoDialog = require('userCenter/common/biz/VideoDialog');
    var AudioPlayer = require('audioPlayer');

    var white = '#FFFFFF';
    var black = '#2B2B2B';
    var brown = '#9C2334';
    var pink = '#FECDD1';
    var green = '#53CBC2';
    var blue = '#62C8EB';

    var colorList = {
        white: '#FFFFFF',
        black: '#2B2B2B',
        brown: '#9C2334',
        pink: '#FECDD1',
        green: '#53CBC2',
        blue: '#62C8EB'
    }

    return Ractive.extend({
        template: require('html!./PreviewDetail.html'),
        data: function () {
            return {
                style: require('text!./PreviewDetail.styl'),
                colorList: colorList,
                formatText: function (text) {
                    text = text.replace(/\n/g, '<br>');
                    return text.replace(/ /g, '&nbsp;');
                },
                themeChecked: 'white',
                options: {
                    close: $.noop,
                    list: {
                        style: '',
                        list: {}
                    }
                }
            };
        },
        onrender: function () {
            var me = this;
            var list = me.get('options.list.list');
            $.each(
                list,
                function (index, value) {
                    value.idx = index;
                    if (value.type == 'audio') {
                        value.playing = false;
                    }
                }
            )
            me.set('options.list.list', list);

            me.bindData({
                'themeChecked': 'options.list.style'
            });
            me.observe('themeChecked', function (color) {
                me.set('options.list.style', color);
            });

            var container = $(me.getElement());
            me.audioPlayer = new AudioPlayer({
                element: container.find('.view-audio-wrapper'),
                onPlayComplete: function (data) {
                    var list = me.get('options.list.list');
                    var data = {};
                    $.each(list, function (index, value) {
                        if (value.playing) {
                            data['options.list.list.' + index + '.playing'] = false;
                        }
                    });
                    me.set(data);
                    me.audioPlayer.stop();
                }
            });
        },
        close: function () {
            this.get('options').close();
        },
        playVideo: function (val) {
            var me = this;
            var url = '/tcenter/foundation/storage/get-video-info?id=' + val.options.video_id;
            $.ajax({
                url: url,
                method: 'get',
                success: function(response) {
                    if (response.data.status == 70) {
                        new VideoDialog({
                            url: response.data.pc_play_url
                        });
                        var data = {}
                        data['options.list.list.' + val.idx + '.options.cover'] = response.data.preface_url;
                        me.set(data);
                    }
                    else {
                        alert({
                            type: 'error',
                            content: '视频正在转码中...'
                        });
                    }
                }
            });
        },
        playAudio: function (value) {
            var me = this;
            var url = value.options.url;
            var data = {};
            var list = me.get('options.list.list');
            $.each(list, function (index, val) {
                if (val.playing) {
                    data['options.list.list.' + index + '.playing'] = false;
                }
            });
            if (value.playing) {
                data['options.list.list.' + value.idx + '.playing'] = false;
                me.audioPlayer.stop();
            }
            else {
                data['options.list.list.' + value.idx + '.playing'] = true;
                me.audioPlayer.play(url);
            }
            me.set(data);
        }
    });

})