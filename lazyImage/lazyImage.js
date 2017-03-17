var preLoadDistance = 200;  //200的阈值 预加载
var timeInterval = 300;  //300的阈值  两次操作之间的间隔
var $window = $(window);
var w = window;
var imgs;
var timer;

//获取offsetTop
function getOffsetTop($node) {
    var offsetTop = $node.offset().top;
    while(!offsetTop) {
        offsetTop = $node.parent().offset().top;
    }
    return offsetTop;
}

//获取offsetLeft
function getOffsetLeft($node) {
    var offsetLeft = $node.offset().left;
    while(!offsetLeft) {
        offsetLeft = $node.parent().offset().left;
    }
    return offsetLeft;
}

//在加载容器视图下方  这里计算方式都加了200的预加载距离
function belowTheFold($element, $container) {
    var fold;
    if (!$container || $container[0] == w) {
        fold = (w.innerHeight ? w.innerHeight : $window.height()) + $window.scrollTop();
    } else {
        fold = getOffsetTop($container) + $container.height();
    }
    return fold <= getOffsetTop($element) - preLoadDistance;
}

//在加载容器视图上方
function aboveTheTop($element, $container) {
    var fold;
    if (!$container || $container[0] == w) {
        fold = $window.scrollTop();
    } else {
        fold = getOffsetTop($container);
    }
    return fold >= getOffsetTop($element) + preLoadDistance + $element.height();
}

//在加载容器视图右边
function rightOfFold($element, $container) {
    var fold;
    if (!$container || $container[0] == w) {
        fold = $window.width() + ($.fn.scrollLeft ? $window.scrollLeft() : w.pageXOffset);
    } else {
        fold = getOffsetLeft($container) + $container.width();
    }
    return fold <= getOffsetLeft($element) - preLoadDistance;
}

//在加载容器视图左边
function leftOfBegin($element, $container) {
    var fold;
    if (!$container || $container[0] == w) {
        fold = $.fn.scrollLeft ? $window.scrollLeft() : w.pageXOffset;
    } else {
        fold = getOffsetLeft($container);
    }
    return fold >= getOffsetLeft($element) + preLoadDistance + $element.width();
}

//是否在容器视图中
function isInScrollView($element, $container) {
    if (aboveTheTop($element, $container)
        || leftOfBegin($element, $container)) {
        //这种情况下 已经加载过了  不需要再做处理
    }
    else {
        return !belowTheFold($element, $container)
               && !rightOfFold($element, $container)
               ;
    }
}

function setLoading($img) {
    if (!$img.prop('loading')) {
        $img.prop('loading', true).addClass('img-loading');
    }
}

function init(container) {
    var $container = container ? $(container) : $window;
    if ($container === $window) {
        imgs = $(document.body).find('img[data-src]');
    }
    else {
        imgs = $container.find('img[data-src]');
    }
    
    imgs.each(function () {
        var $img = $(this);
        if (isInScrollView($img, $container)) {
            if (!$img.prop('loaded')) {
                $img.prop('src', $img.data('src')).prop('loaded', true).removeAttr('data-src').removeClass('img-loading');
            }
        } 
        else {
            setLoading($img);
        }
    });

}

init();
var preLoadtime = +new Date();
$window.scroll(function () {
    var currentTime = +new Date();
    var delta = currentTime - preLoadtime;
    if (delta > timeInterval) {
        clearTimeout(timer);
        preLoadtime = currentTime;
        init();
    }
    else {
        timer = setTimeout(init(), delta);
    }
});





