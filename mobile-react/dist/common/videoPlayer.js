define(function (require, exports) {
    'use strict';
    var _ajaxConfig = require('common/ajaxConfig');
    var _ajaxService = require('common/util/ajaxService');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);
    var _ajaxService2 = _interopRequireDefault(_ajaxService);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var lastPlayTime = 0;
    var isSeeked = false;
    var isPlayed = false;
    var playTimes = 0;
    var setPlayHistoryFun = void 0;
    var isEnded = void 0;
    function initPlayer(obj) {
        var player = new bjcPlayer(obj.container, {
            token: obj.token,
            onended: function onended() {
                if (setPlayHistoryFun) {
                    clearInterval(setPlayHistoryFun);
                }
                if (isPlayed) {
                    setLastPlayTime(0);
                }
                isEnded = 1;
            },
            onplay: function onplay() {
                setTimeout(function () {
                    isPlayed = true;
                }, 3000);
                if (lastPlayTime && !isSeeked) {
                    setTimeout(function () {
                        player.seek(lastPlayTime);
                    }, 1000);
                }
                clearInterval(setPlayHistoryFun);
                setPlayHistoryFun = setInterval(function () {
                    if (isEnded) {
                        clearInterval(setPlayHistoryFun);
                    }
                    var playTimesNum = Math.floor(playTimes);
                    if (playTimesNum % 5 === 0) {
                        if (isPlayed) {
                            setLastPlayTime(playTimes);
                        }
                    }
                }, 1000);
            },
            onpause: function onpause() {
                clearInterval(setPlayHistoryFun);
            },
            onerror: function onerror(e) {
                console.log(e);
            },
            ontimeupdate: function ontimeupdate(time) {
                playTimes = time;
                if (isEnded) {
                    return;
                }
            },
            onseeked: function onseeked(time) {
                isSeeked = true;
                playTimes = time;
            },
            onfullScreen: function onfullScreen() {
            },
            onvolumechange: function onvolumechange() {
            }
        });
        getLastPlayTime(obj.courseId);
        player.play(obj.id);
        function getLastPlayTime(courseId) {
            var params = { courseId: courseId };
            _ajaxService2.default.get(_ajaxConfig2.default.VIDEO.GET_HISTORY, params).then(function (res) {
                if (res && res.code === 200) {
                    lastPlayTime = res.data.x;
                }
            });
        }
        function setLastPlayTime(num) {
            var params = {
                courseId: obj.courseId,
                x: num
            };
            _ajaxService2.default.post(_ajaxConfig2.default.VIDEO.SET_HISTORY, params).then(function (res) {
                if (res && res.code === 200) {
                }
            });
        }
    }
    exports.default = { initPlayer: initPlayer };
});