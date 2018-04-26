define(function(require, exports) {

    'use strict';
    var Popup = require('cobble/helper/Popup');
    var service = require('common/service');
    var VideoDialog = require('common/component/VideoDialog');

    var container = $('#main');

    //隐藏显示更多老师
    var hideMore = function(){
        var last = container.find('.teacher-intro .active ul');
        if(!last.hasClass('bigbox')){
            var more = container.find('.more-info');
            more.hide();
        }
    }
    //加载更多
    var loadMore = function(){
        var teacherCard = container.find('.teacher-intro .active');
        var bigbox = teacherCard.find('.bigbox');
        bigbox.each(function(i,item){
            var element = $(item);
            if(i!=0){
                element.addClass('hide');
            }
        });
    }

    var newVideoDialog = function (path, title) {
        new VideoDialog({
            title: title,
            url: path
        });
    }

    exports.init =  function () {
        loadMore();
        hideMore();
        new Popup({
            element: container.find('.sharebox'),
            layer: container.find('.sharebox .baidu-share'),
            show: {
                trigger: 'over',
                delay: 100
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });
        container
        .on('click', '.submit-number', function () {
            var mobile = $.trim(container.find('.input-number').val());
            var regm = /^1[34578]\d{9}$/;
            var rego = /^(0[0-9]{2,3})(-)([0-9]{7,8})$/;
            if (!regm.test(mobile) && !rego.test(mobile)) {
                alert('请填写正确的电话号码！');
                return;
            }
            service
            .vacationCourse({
                type_id: 2,
                mobile: mobile
            })
            .done(function (responses) {
                if (responses.code == 0) {
                    container.find('.input-number').val('');
                    alert('提交成功，请稍候！');
                }
            });
        })
        .on('click','#tab',function(){
            var element = $(this);
            element.addClass('active').siblings().removeClass('active');
            var parent = container.find('.teacherCard');
            var floor = element.data('floor');
            parent
            .each(function (i, item) {
                var val = $(item);
                val.removeClass('active');
                val.hide();
                if(val.data('floor') == floor ){
                    val.show();
                    val.addClass('active');
                }

            });
            loadMore();
            var moreShow = container.find('.more-info');
            moreShow.show();
            hideMore();

        })
        .on('click','.more-info',function(){
            var element = $(this);
            var teacherCard = container.find('.teacher-intro .active');
            var bigbox = teacherCard.find('.bigbox');
            bigbox.each(function(i,item){
                var hide = $(item);
                if(hide.hasClass('hide')){
                    hide.removeClass('hide');
                    return false;
                }
            });
            var last = teacherCard.find('.bigbox:last');
            if(!last.hasClass('hide')){
                element.hide();
            }
        })
        .on('click','.photo',function(e){

            var view = $(this).data('view');
            var title = $(this).data('title') || '一对一辅导介绍';
            if (view) {
                newVideoDialog(view, title);
            }
            e.preventDefault();

        })

    }

});