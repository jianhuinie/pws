/**
 * 点播视频课播放
 * @date 2018/01/22
 */

import AJAXCONFIG from 'common/ajaxConfig';
import AJAXSERVICE from 'common/util/ajaxService';
let lastPlayTime = 0;
let isSeeked = false;
let isPlayed = false;
let playTimes = 0;
let setPlayHistoryFun;
let isEnded;

// 初始化播放器
function initPlayer(obj) {
    const player = new bjcPlayer(obj.container, {
        token: obj.token,
        onended: function () {
            if (setPlayHistoryFun) {
                clearInterval(setPlayHistoryFun);
            }
            if (isPlayed) {
                setLastPlayTime(0);
            }
            isEnded = 1;
        },
        onplay: function () {
            setTimeout(function () {
                isPlayed = true;
            }, 3000);
            if (lastPlayTime && !isSeeked) {
                setTimeout(function () {
                    player.seek(lastPlayTime);
                }, 1000); 
            }
            clearInterval(setPlayHistoryFun);
            // 每次点击播放触发计时器
            setPlayHistoryFun = setInterval(function () {
                if (isEnded) {
                    clearInterval(setPlayHistoryFun);
                }
                const playTimesNum = Math.floor(playTimes);
                if (playTimesNum % 5 === 0) {
                    if (isPlayed) {
                        setLastPlayTime(playTimes);
                    }
                }
            }, 1000);
        },
        onpause: function () {
            // 暂停
            clearInterval(setPlayHistoryFun);
        },
        onerror: function (e) {
            console.log(e);
        },
        ontimeupdate: function (time) {
            playTimes = time;
            if (isEnded) {
                return;
            }
        },
        onseeked: function (time) {
            // 
            isSeeked = true;
            playTimes = time;
        },
        onfullScreen: function () {
            // 
        },
        onvolumechange: function () {
            // 
        }
    });
    getLastPlayTime(obj.courseId);
    player.play(obj.id);

    // 获取上次播放事件
    function getLastPlayTime(courseId) {
        const params = {
            courseId: courseId
        };

        AJAXSERVICE.get(AJAXCONFIG.VIDEO.GET_HISTORY, params).then(function (res) {
            if (res && res.code === 200) {
                lastPlayTime = res.data.x;
            }
        });
    }

    // 上报播放时间
    function setLastPlayTime(num) {
        // toDo
        const params = {
            courseId: obj.courseId,
            x: num,
        };

        AJAXSERVICE.post(AJAXCONFIG.VIDEO.SET_HISTORY, params).then(function (res) {
            if (res && res.code === 200) {
                // 
            }
        });
    }
}

export default {
    initPlayer: initPlayer,
};