//安全距离
var SAFE_DISTANCE = 200;
var SAFE_TIME = 300;
var timer;

var imgEles = document.images;
var imgLength = imgEles.length;

//可视区高度
var clientHeight = document.documentElement.clientHeight;
//可视区宽度
var clientWidth = document.documentElement.clientWidth;

//首先执行一次loadImg
loadImgs(imgEles);
var preTime = +new Date();

//滚动窗口时执行loadImg
window.onscroll = function () {
	var currTime = +new Date();
	var overplus = currTime - preTime;

	if (overplus > SAFE_TIME) {
		clearTimeout(timer);
        preTime = currTime;
		loadImgs(imgEles);
	}
	else {
		timer = window.setTimeout(loadImgs(imgEles), overplus);
	}
   
}

//判断图片是否在可视区 imgEle:图片元素；srollHeight:当前滚动高度
function isInClient(imgEle, srollHeight, srollWidth) {

	var clientNum = imgEle.getBoundingClientRect();
	//元素距离文档顶部宽高
    var offsetHeight = clientNum.top;
    var offsetWidth = clientNum.left;
    //元素自身宽高
    var eleHeight = clientNum.height;
    var eleWidth = clientNum.width;

	//进入可视区上下左右
    if (offsetHeight > (srollHeight - SAFE_DISTANCE) 
    	&& (offsetHeight + eleHeight) < (srollHeight + clientHeight + SAFE_DISTANCE) 
    	&& offsetWidth > (srollWidth - SAFE_DISTANCE)
    	&& (offsetWidth + eleWidth) < (srollWidth + clientWidth + SAFE_DISTANCE)) {

    	return true;
    }
};

//懒加载图片
function loadImgs(imgList) {
    //滚动高度,宽度
    var srollHeight = document.documentElement.scrollTop;
    var srollWidth = document.documentElement.scrollLeft;
    
    for (var i = 0; i < imgLength; i++) {
        var isLoad = imgList[i].getAttribute('data-load');

        if (isInClient(imgList[i], srollHeight, srollWidth) && !isLoad) {
            var url = imgList[i].getAttribute('data-src');
            imgList[i].setAttribute('src', url);
            imgList[i].setAttribute('data-load', 'true');
        }
    }
}