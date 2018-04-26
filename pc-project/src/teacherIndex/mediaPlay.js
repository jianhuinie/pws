/*
 * @file 老师详情视频照片播放
 * @author wuhongjie
 */
define(function(require, exports){
    var VideoDialog = require('common/component/VideoDialog');
    var ImageDialog = require('common/component/ImageDialog');
    var store = require('common/store');
    var lazyImage = require('common/lazyImage');
    var header = require('./header');

    var teacherPhotos = $('#teacher-photos');

    exports.init = function(){
        if(store.get('initHeader')){
            header.init();
        }
        lazyImage.init();
        teacherPhotos.on('click','.teacher-photo-item',function(e){
            var thiz = $(this);
            var type = thiz.data('type');
            var title = thiz.data('name');

            if(thiz.data('last')){
                location.href = store.get('domain')+'/photoVideo';
            }
            else if(type == 'video'){
                new VideoDialog({
                    url: thiz.data('video'),
                    title: store.get('teacherName').substr(0,15)+'...' + (title ? (' - ' + title) : ''),
                    videoWidth: 674,
                    videoHeight: 379
                });
            }else{
                var index = thiz.data('index');
                var photos = teacherPhotos.find('[data-index]');
                var data = photos.map(function (index, item) {
                    var element = $(item);
                    var name = element.data('name');
                    return {
                        url: element.data('image'),
                        title: store.get('teacherName').substr(0,15)+'' + (name ? (' - ' + name) : '')
                    };
                });

                new ImageDialog({
                    data: data,
                    index: index
                });
            }
        })
    }
});