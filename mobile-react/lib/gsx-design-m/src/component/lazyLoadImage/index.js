/**
 * Created by gsx on 15/12/28.
 */
define(function (require, exports) {
    'use strict';

    var $ = require('zepto');

    var utilBase = require('../../util/base');
    var utilFunction = require('../../util/function');
    var MVCArray = require('../../util/mvc/MVCArray');
    var observer = require('../../util/mvc/observer');
    var isScale = utilBase.isScale();

    var IMG_DATA_SRC = 'data-src';

    var threshold = 200;

    var check_appear_throttle_time = 300;
    /*是否使用阿里裁剪服务，不使用则原样输出*/
    var useAliService = 1;

    var $window = $(window);
    var w = window;

    //根据img标签的uid，记录是否初始化过
    var hashMapStore = {};

    //保存所有初始化过的img标签
    var mvcArrImages = new MVCArray();

    // 所有在屏幕中显示出来的img标签
    var viewArrImages = new MVCArray();

    var createViewportFilter = (function () {
        var store = [];
        var outputArray;
        var insertListener;
        //是否在一个隐藏的容器中,或图片
        function isHidden(element) {
            var $element = $(element);
            if ($element.css('display') == 'none') {
                return true;
            }
            // todo 先检查宽高,如果为0再检查父元素
            var hiddenParentNodes = $element.parents(':hidden');
            if (hiddenParentNodes.length !== 0) {
                for (var i = hiddenParentNodes.length - 1; i >= 0; i--) {
                    if (hiddenParentNodes.eq(i).css('display') == 'none') {
                        return true;
                    }
                }
            }

            // hurry: 判断元素是否移除
            var sameDom = $('img[data-src="' + $element.data('src') + '"]');
            var len = sameDom.length;
            if (!len) {
                return true;
            }
            else {
                // hurry： 判断是否存在同一data-src的元素，存在则继续通过lazyID判断
                var flag = true;
                var lazyID = utilBase.getUid(element);
                for (i = 0; i < len; i++) {
                    if (utilBase.getUid(sameDom[i]) === lazyID) {
                        flag = false;
                        break;
                    }
                }
                return flag;
            }
            return false;
        }

        function belowTheFold($element, $container) {
            var fold;
            if (!$container || $container[0] == w) {
                fold = ('innerHeight' in w ? w.innerHeight : $window.height()) + $window.scrollTop()
            } else {
                fold = $container.offset().top + $container.height();
            }
            return fold <= $element.offset().top - threshold;
        }

        function aboveTheTop($element, $container) {
            var fold;
            if (!$container || $container[0] === w) {
                fold = $window.scrollTop();
            } else {
                fold = $container.offset().top;
            }
            return fold >= $element.offset().top + threshold + $element.height();
        }

        function rightOfFold($element, $container) {
            var fold;
            if (!$container || $container[0] == w) {
                // Zepto do not support `$window.scrollLeft()` yet.
                fold = $window.width() + ($.fn.scrollLeft ? $window.scrollLeft() : w.pageXOffset);
            } else {
                fold = $container.offset().left + $container.width()
            }
            return fold <= $element.offset().left - threshold;
        }

        function leftOfBegin($element, $container) {
            var fold;
            if (!$container || $container[0] == w) {
                // Zepto do not support `$window.scrollLeft()` yet.
                fold = $.fn.scrollLeft ? $window.scrollLeft() : w.pageXOffset
            } else {
                fold = $container.offset().left;
            }
            return fold >= $element.offset().left + threshold + $element.width();
        }

        function isInScrollView(element) {
            var $element = $(element);

            var $scrollWrap = $element.parents('[data-scroll-wrap]');
            if ($scrollWrap.length > 0) {
                if (!isInScrollView($scrollWrap[0])) {
                    return false;
                }
            } else {
                $scrollWrap = null
            }


            if (aboveTheTop($element, $scrollWrap) || leftOfBegin($element, $scrollWrap)) {
                // Nothing.
            } else if (!belowTheFold($element, $scrollWrap) && !rightOfFold($element, $scrollWrap)) {
                return true
            }
        }

        function check() {
            var n = store.length;
            var imgElement;

            for (var i = 0; i < n; i++) {
                imgElement = store[i];
                if (imgElement && !isHidden(imgElement) && isInScrollView(imgElement)) {
                    store.splice(i, 1);
                    outputArray.push(imgElement);
                    n--;
                    i--;
                }
            }
        }

        function destroy() {
            store.length = 0;
            outputArray = null;
            if (insertListener) {
                observer.removeListener(insertListener);
                insertListener = null;
            }
        }

        return function (inputMVCArray, outputMVCArray) {
            outputArray = outputMVCArray;
            inputMVCArray.forEach(function (item) {
                store.push(item);
            });
            insertListener = observer.addListener(inputMVCArray, 'insert_at', function (data) {
                store.push(data);
                check();
            });
            check();
            return {
                'check': check,
                'destroy': destroy
            }
        }
    })();

    var viewportFilter = createViewportFilter(mvcArrImages, viewArrImages);

    var isRetina = (window.devicePixelRatio || screen.deviceXDPI && screen.deviceXDPI / 96) > 1;
    ////原图裁剪
    //"i": 0,
    //    //1:按短边缩放, 0按长边缩放
    //    "e": 0,
    //    //不需要手动传，设置i或e参数后，该参数自动设置为1
    //    "c": 0,
    var defaultImageParam = {
        //缩放
        "x": isRetina ? 2 : 1,
        //图片质量
        "Q": 70,
        //旋转参数,0 按原图默认, 1 按原图EXIF信息自动旋转,默认0
        "o": 1
    };

    var emptyImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRAA7';


    function parseImageCssSize($element, callback, _loop) {
        var element = $element.get(0);
        var size = element['__size__'];

        if (size) {
            callback(size);
        } else {
            var src = $element.attr('data-src');
            var cssWidth;
            var cssHeight;
            var done = function () {
                if ($cloneElement.width() != cssWidth) {
                    cssWidth = 'auto';
                }
                if ($cloneElement.height() != cssHeight) {
                    cssHeight = 'auto';
                }
                size = element['__size__'] = {
                    'width': cssWidth,
                    'height': cssHeight
                };
                cloneElement.parentNode.replaceChild(element, cloneElement);
                element['__image__'] = null;
                delete element['__image__'];
                cloneElement = null;
                callback(size);
            };
            if (element['__image__']) {
                $(element['__image__']).one('load', function () {
                    setTimeout(function () {
                        parseImageCssSize($element, callback, 1);
                    });
                });
            } else if (!$element.attr('src')) {
                //为了不触发原始img节点的onload事件,
                //只好克隆一个出来放到原img的位置去计算尺寸,
                //没想到啥更好的办法了,凑合用吧 by xuz 20160220
                var cloneElement = element.cloneNode();
                //cloneElement._clone = 1;
                var $cloneElement = $(cloneElement);
                element['__image__'] = cloneElement;
                element.parentNode.replaceChild(cloneElement, element);

                cssWidth = $cloneElement.width();
                cssHeight = $cloneElement.height();
                element['__size__'] = false;
                cloneElement.src = emptyImage;
                if (cloneElement.complete) {
                    done();
                } else {
                    $cloneElement.one('load', done);
                }
            } else {
                cssWidth = $element.width();
                cssHeight = $element.height();
                size = element['__size__'] = {
                    'width': cssWidth,
                    'height': cssHeight
                };
                callback(size);
            }
        }
    }

    function createLazyFn(fn) {
        return function (element, options) {
            var lazyOptions = element._lazy_options;
            if (lazyOptions && lazyOptions.support_oss) {
                fn($(element), lazyOptions, options);
            }
        }
    }

    var fn_autoCut = createLazyFn(function ($element, lazyOptions, options) {
        var oss_params = lazyOptions.oss_params;
        lazyOptions.fn_num++;

        parseImageCssSize($element, function (cssSize) {
            if (cssSize.width > 0 && cssSize.height > 0) {
                oss_params['c'] = 1;
                oss_params['e'] = 1;
                oss_params['w'] = isScale ? Math.ceil(cssSize.width / window.devicePixelRatio) : cssSize.width;
                oss_params['h'] = isScale ? Math.ceil(cssSize.height / window.devicePixelRatio) : cssSize.height;
            }
            lazyOptions.fn_done();
        });
    });

    //自动计算宽高尺寸,默认设置按长边优先缩放,可以通过options.e=1设置短边优先
    var fn_autoSize = createLazyFn(function ($element, lazyOptions, options) {
        var oss_params = lazyOptions.oss_params;
        lazyOptions.fn_num++;
        parseImageCssSize($element, function (cssSize) {
            if (cssSize.width > 0) {
                oss_params['w'] = isScale ? Math.ceil(cssSize.width / window.devicePixelRatio) : cssSize.width;
            }
            if (cssSize.height > 0) {
                oss_params['h'] = isScale ? Math.ceil(cssSize.height / window.devicePixelRatio) : cssSize.height;
            }
            if (cssSize.width > 0 && cssSize.height > 0) {
                oss_params['e'] = 0;
            }
            lazyOptions.fn_done();
        });
    });

    var fn_disableCut = createLazyFn(function (element, lazyOptions) {
        var oss_params = lazyOptions.oss_params;
        delete oss_params['c'];
    });

    var fn_clearSize = createLazyFn(function (element, lazyOptions) {
        var oss_params = lazyOptions.oss_params;
        delete oss_params['w'];
        delete oss_params['h'];
    });

    var fn_jpg = createLazyFn(function (element, lazyOptions) {
        var oss_params = lazyOptions.oss_params;
        oss_params['wh'] = 1;
        oss_params['pr'] = 1;
    });

    exports.fn = {
        'autoCut': fn_autoCut,
        'autoSize': fn_autoSize,
        'disableCut': fn_disableCut,
        'clearSize': fn_clearSize,
        'jpg': fn_jpg
    };

    function isSupportALiYunParams(imgSrc) {
        // 适配 https://imgs.genshuixue.com/ https://img.genshuixue.com/ https://imgs.genshuixue.com/等等
        return imgSrc.indexOf('gsxservice') !== -1 || imgSrc.indexOf('genshuixue') !== -1;
        // return imgSrc.indexOf('img.gsxservice') !== -1 || imgSrc.indexOf('test-img.gsxservice') !== -1 || imgSrc.indexOf('imgs.genshuixue') !== -1 || imgSrc.indexOf('test-imgs.genshuixue') !== -1;
    }

    function parserOssParamsUrl(ossParams) {
        //如果没有宽高不能增加其他参数,会报错
        if (!ossParams.w && !ossParams.h) {
            return '';
        }
        var temp;
        var itemValue;
        var itemPipe;
        var pipes = {};
        for (var key in ossParams) {
            if (ossParams.hasOwnProperty(key)) {
                temp = ossParams[key];
                if (utilBase.isObject(temp)) {
                    itemValue = temp.value;
                    itemValue = temp.pipe;
                } else {
                    itemValue = temp;
                    itemPipe = 'default';
                }
                if (!pipes[itemPipe]) {
                    pipes[itemPipe] = [];
                }
                pipes[itemPipe].push(itemValue + key);
            }
        }
        var rst = [];
        for (var i in pipes) {
            if (pipes.hasOwnProperty(i)) {
                rst.push(pipes[i].join('_'));
            }
        }
        return rst.join('|');
    }

    function getOssImageInfo(imageSrc, callback) {
        $.getJSON(imageSrc + '@info', function (response) {
            callback(response);
        });
    }

    function initImageWrap() {

        function setImageSizeAndPosition($image, imageWidth, imageHeight, wrapWidth, wrapHeight) {
            var wrapWHS = wrapWidth / wrapHeight;
            var imageWHS = imageWidth / imageHeight;
            if (imageWHS > wrapWHS) {
                $image.css({
                    'left': 0,
                    'top': Math.round((wrapHeight - (wrapWidth / imageWHS)) / 2),
                    'width': '100%',
                    'height': Math.round(wrapWidth / imageWHS)
                });
            } else {
                $image.css({
                    'left': Math.round((wrapWidth - (wrapHeight * imageWHS)) / 2),
                    'top': 0,
                    'width': Math.round(wrapHeight * imageWHS),
                    'height': '100%'
                });
            }
        }

        observer.addListener(exports, 'lazy_appear', function (image, lazyOptions) {
            var $image = $(image);
            var $wrap = $image.parents('[data-image-wrap]').eq(0);
            if ($wrap.length == 0) {
                return;
            }

            var mode = $wrap.attr('data-image-wrap') || 'auto';
            if (mode == 'center') {
                var wrapWidth = $wrap.width();
                var wrapHeight = $wrap.height();
                if (!wrapWidth || !wrapHeight) {
                    throw Error('data-image-wrap为center时,外层容器必须有宽高');
                }
                var wrapPosition = $wrap.css('position');
                if (wrapPosition !== 'relative' || wrapPosition != 'absolute') {
                    $wrap.css('position', 'relative');
                }
                $image.css('position', 'absolute');
                //图片可能从相对定位变为绝对定后后,外从容器的尺寸发生变化,需要重新计算
                wrapWidth = $wrap.width();
                wrapHeight = $wrap.height();
                if (lazyOptions.support_oss) {
                    lazyOptions.fn_num++;
                    fn_disableCut(image);
                    fn_clearSize(image);
                    getOssImageInfo(lazyOptions.origin_src, function (info) {
                        if (info) {
                            setImageSizeAndPosition(
                                $image,
                                info.width, info.height,
                                wrapWidth, wrapHeight
                            );
                            fn_autoSize(image);
                        }
                        lazyOptions.fn_done();
                    });
                } else {
                    $image.css({
                        'left': 0, 'top': 0,
                        'width': 'auto', 'height': 'auto',
                        'max-width': '100%', 'max-height': '100%',
                        'visibility': 'hidden'
                    });
                    observer.addListenerOnce(image, 'lazy_loaded', function (loaderImage, lazyOptions) {
                        $image.css('visibility', 'visible');
                        setImageSizeAndPosition(
                            $image,
                            loaderImage.width, loaderImage.height,
                            wrapWidth, wrapHeight
                        );
                    });
                }
            } else if (mode == 'image-info') {
                if (lazyOptions.support_oss) {
                    $image.css({
                        'max-width': '100%'
                    });
                    fn_disableCut(image);
                    fn_clearSize(image);
                    lazyOptions.oss_params['w'] = image.offsetWidth;
                } else {
                    $image.css({
                        'width': 'auto', 'height': 'auto',
                        'max-width': '100%'
                    });
                }
            }
        });
    }

    var gifReg = /\.(gif)$/i;

    function initViewImagesArray() {
        observer.addListener(viewArrImages, 'insert_at', function (element) {
            var $element = $(element);
            var imgSrc = $element.attr('data-src');
            var isSupportOss = isSupportALiYunParams(imgSrc);
            var lazyOptions = element._lazy_options = {
                'origin_src': imgSrc,
                'support_oss': isSupportOss,
                'oss_params': {},
                'ext_name': 'src'
            };

            //生成回调计数器,用于需要异步处理图片加载的场景
            //lazyOptions.fn_num++;
            //async(function(){
            //   lazyOptions.fn_done();
            // })
            lazyOptions.fn_done = function () {
                if (counterFn) {
                    counterFn();
                } else {
                    setTimeout(function () {
                        counterFn && counterFn();
                    }, 0);
                }
            };
            lazyOptions.fn_num = 0;

            //如果支持图片服务,先走默认逻辑处理图片参数
            if (isSupportOss) {
                $.extend(lazyOptions.oss_params, defaultImageParam);
                fn_autoSize(element);
                fn_autoCut(element);
                if (gifReg.test(imgSrc)) {
                    lazyOptions['support_oss'] = false;
                }
            }

            var counterFn;

            //抛出事件,让具体业务进一步处理图片参数
            observer.trigger(exports, 'lazy_appear', element, lazyOptions);

            counterFn = utilFunction.counter(lazyOptions.fn_num || 0, function () {
                //生成url
                var url = imgSrc;
                if (useAliService && lazyOptions.support_oss) {
                    url += '@' + parserOssParamsUrl(lazyOptions.oss_params);
                    if (lazyOptions.ext_name) {
                        url += '.' + lazyOptions.ext_name;
                    }
                }
                //如果不使用后台加载方式就直接设置图片的src
                if (lazyOptions.no_fake_img_loader) {
                    $element.one('load', function () {
                        observer.trigger(element, 'lazy_loaded', element, lazyOptions);
                        $element.css('visibility', 'visible');
                    });
                    $element.attr('src', url);
                } else {
                    $('<img />').one('load', function () {
                        var autoShow = true;
                        observer.trigger(element, 'lazy_loaded', this, lazyOptions);
                        $element.css('visibility', 'visible');

                        if (autoShow !== false) {
                            var disableShowEffect = lazyOptions.disableShowEffect;
                            if (!disableShowEffect) {
                                $element.css('opacity', 0);
                            }
                            $element.attr('src', url);
                            if (!disableShowEffect) {
                                $element.animate({
                                    'opacity': 1
                                }, 200);
                            }
                        }
                    }).attr('src', url);
                }
            });
        });
    }

    var throttle = (function () {
        var beforeTime = +new Date;
        var timer;

        return function () {
            var currentTime = +new Date;
            var delta = currentTime - beforeTime;
            if (delta > check_appear_throttle_time) {
                clearTimeout(timer);
                beforeTime = currentTime;
                viewportFilter.check();
            } else {
                timer = window.setTimeout(utilFunction.bind(viewportFilter.check, null, viewportFilter), delta);
            }
        };
    })();

    //处理data-image-wrap, 在固定只存中等比缩放图片,居中显示不同尺寸的图片
    initImageWrap();
    //初始化MVC数组, 所有判断为即将显示的图片将push到这个数组中
    initViewImagesArray();
    //绑定滚动事件, 检查所有图片
    $(window).on('scroll.lazyLoadImage', throttle);


    /**
     * event:
     *  lazy_appear
     *
     * */
    exports.init = function (container, forceReload, useAliImgService) {

        useAliImgService != undefined && (useAliService = useAliImgService);
        container = container || document.body;

        var $nodes1 = $(container).filter('img[' + IMG_DATA_SRC + ']');
        var $nodes2 = $(container).find('img[' + IMG_DATA_SRC + ']');

        var lazyID, $item;

        function add(index, item) {
            $item = $(item);
            if ($item.attr(IMG_DATA_SRC)) {
                lazyID = utilBase.getUid(item, forceReload);
                //判断是否初始化过该图片
                if (!hashMapStore[lazyID]) {
                    mvcArrImages.push(item);
                    hashMapStore[lazyID] = 1;
                }
            }
        }

        $.each($nodes1, add);
        $.each($nodes2, add);
    };

    exports.refresh = function (force) {
        if (!force) {
            throttle();
        } else {
            viewportFilter.check();
        }
    };
});

/**
 * 使用说明: (示例可参考/help/lazyLoadImage/index.html)
 *      提供页面中图片懒加载, 会自动绑定window的scroll事件进行检查
 *  <div data-scroll-wrap="1">
 *      <div data-image-wrap="center">
 *          <img data-src="xxx.png"/>
 *      </div>
 *  </div>
 *  标签属性:
 *      data-src                 图片地址
 *      data-scroll-wrap="1"     标识局部滚动的外层容器
 *      data-image-wrap="center"   标识图片外层容器, 使用等比缩放的方式在容器中居中展示图片
 *                     ="image-info" 图文详情外层容器, 通常情况可以不用添加, 因为后台已经把img添加了宽度100%的属性
 *
 * =======================================================================================
 *
 * 接口说明:
 *  lazyLoadImage.init(container, forceReload);
 *      container {HTMLElement|null} (可选) 查找指定容器中的图片, 不传的话默认取body, 也可以传一个img元素
 *      forceReload {Boolean} (可选) 强制重新加载图片
 *
 *  lazyLoadImage.refresh();
 *      马上刷新, 检查已经查找到的所有图片是否展示在视图区域内
 *
 *  ======================================================================================
 *
 * 扩展: (可参考该文件中的initImageWrap函数)
 *
 *  observer.addListener(lazyLoadImage, 'lazy_appear', function(image, lazyOptions){
 *      //检查到图片出现在视图区域内时, 即将加载该图片时, 触发该事件, 用于处理图片加载的特殊情况
 *
 *      lazyOptions.origin_src; // 图片地址,与data-src相同
 *      lazyOptions.support_oss; // [只读]该图片是否支持阿里云图片服务的参数
 *      lazyOptions.oss_params; //  [可修改]图片处理参数
 *      lazyOptions.no_fake_img_loader // [可修改]设置不适用后台加载,直接设置src
 *      lazyOptions.fn_num; //  用来异步处理图片回调, fn_num与fn_done需要配合使用,
 *                          //  当需要异步处理图片时fn_num++,处理完成时调用fn_done,标识处理完成
 *      lazyOptions.fn_done;//  同上
 *
 *      //阿里云图片服务参考文档:
 *      //   https://help.aliyun.com/document_detail/oss/oss-img-guide/resize/resize.html
 *  });
 *
 *
 *  observer.addListener(imageElement, 'lazy_loaded', function(lazyImageElement, lazyOptions){
 *      //lazyImageElement, 懒加载的图片,如果设置了lazyOptions.no_fake_img_loader, lazyImageElement就是imageElement
 *
 *      //当懒加载的图片加载完成时触发该事件,注意 这事件并不意味着该img标签的src一定有值了
 *  });
 *
 *  lazyLoadImage.fn.autoCut       //[默认使用]自动裁剪
 *  lazyLoadImage.fn.autoSize      //[默认使用]自动计算尺寸,按长边优先
 *  lazyLoadImage.fn.disableCut    //不适用图片裁剪
 *  lazyLoadImage.fn.clearSize     //清除尺寸参数
 *
 * */