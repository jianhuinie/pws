/*
 * @file 老师详情视频照片播放
 * @author wuhongjie
 */
define(function(require, exports){
    var store = require('common/store');
    var header = require('./header');

    var container = $('#content').find('.teacher-tips');

    exports.init = function(){
        if(store.get('initHeader')){
            header.init();
        }
        container.on('click','.teacher-tags-seemore',function(e){
            var thiz = $(e.currentTarget);
            var show = thiz.attr('data-show');

            if(show == 'true') {
                container.find('.teacher-tips-tag').css("max-height","none");
                thiz.html('收起全部');
                thiz.attr('data-show',false);
            }
            else{
                container.find('.teacher-tips-tag').css("max-height", '65px');
                thiz.html('展开全部');
                thiz.attr('data-show',true);
            }
        })
    }
});