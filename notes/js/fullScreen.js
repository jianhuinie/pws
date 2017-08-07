var enterFullScreen, quitFullScreen, fullScreenChange;
var doc = document.documentElement;
if (doc.requestFullscreen) {
    enterFullScreen  = function () {
        doc.requestFullscreen();
    };
    quitFullScreen = function () {
        document.exitFullscreen();
    };
    fullScreenChange = function (handler) {
        document.addEventListener('fullscreenchange', function () {
            handler(document.fullscreen);
        });
    };
}
else if (doc.webkitRequestFullScreen) {
    enterFullScreen  = function () {
        doc.webkitRequestFullScreen();
    };
    quitFullScreen = function () {
        document.webkitExitFullscreen();
        // document.webkitCancelFullscreen();
    };
    fullScreenChange = function (handler) {
        document.addEventListener('webkitfullscreenchange', function () {
            handler(document.webkitIsFullScreen);
        });
    };
}
else if (doc.mozRequestFullScreen) {
    enterFullScreen  = function () {
        doc.mozRequestFullScreen();
    };
    quitFullScreen = function () {
        document.mozCancelFullScreen();
    };
    fullScreenChange = function (handler) {
        document.addEventListener('mozfullscreenchange', function () {
            handler(document.mozFullScreen);
        });
    };
}
var fullScreen = {
    enterFullScreen: enterFullScreen,
    quitFullScreen: quitFullScreen,
    fullScreenChange: fullScreenChange
};
fullScreen.enterFullScreen();
