define(function (require) {
    var appController = require('common/app');
    var habo = require('common/component/analysis/habo/index');
    var env = require('util/env');
    var liveRoomTab = require('page/course/component/liveTab/liveTab');

    // 点击进入观看回放
    return function (scriptData) {
        var isApp = appController.isApp();
        var $replay = $('.btn-replay-back,#btn-video_course');
        var reportPlatform = '';
        if (!isApp) {
            reportPlatform = 'msite';
        } else if (env.os.isIOS) {
            reportPlatform = 'ios';
        } else if (env.os.isAndroid) {
            reportPlatform = 'android';
        } else {
            reportPlatform = 'etc';
        }
        if ($replay.length == 1) {
            habo.send({
                type: 'CourseDetailReplay_expo',
                CourseNumber: scriptData.classId,
                platform: reportPlatform
            });
        }
        $replay.click(function() {
            // 点击回放的逻辑
            var url = scriptData.replay_button.url;
            var isWeixin = env.thirdapp.isWeixin;
            var number = scriptData.classId;
            $('.download-app-mask').click(function() {
                $('.download-app-mask').hide();
            });
            if (isApp) {
                appController.openNewWindow(url);
                if (scriptData.replay_button.type == 'replay') {
                    habo.send({
                        type: 'CourseDetailReplay_expo',
                        stype: 'LearnReplay'
                    });
                } else {
                    habo.send({
                        type: 'CourseDetailReplay_expo',
                        stype: 'VideoCourse'
                    });
                }
            } else {
                if (scriptData.replay_button.type == 'replay') {
                    habo.send({
                        type: 'CourseDetailReplay_expo',
                        stype: 'LearnReplay'
                    });
                    if (scriptData.isIntoRoom) {
                        liveRoomTab({
                            type: 'playback_room',
                            course_number: '',
                            url: scriptData.replay_button.url
                        });
                    }
                    //location.href = url;
                } else {
                    habo.send({
                        type: 'CourseDetailReplay_expo',
                        stype: 'VideoCourse'
                    });
                    location.href = url;
                }
            }
        });
    };
});