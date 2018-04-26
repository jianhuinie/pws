/**
 * Created by yuanye on 17/1/11.
 */
define(function(require, exports) {
    "use strict";
    var $ = require('zepto');
    var jockey = require('jockey');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var Loading = require('common/ui/Loading/index');
    var ui = require('common/ui');
    var util_url = require('util/url');

    // 实例化Loading
    var loading = new Loading();
    var URL = util_url();
    var imgContainer;
    // ajax flag
    var hasChangeTheme = false;
    // 后端给
    var themes;

    // 预览邀请卡页事件绑定
    function shareBind() {
        var createImg = imgContainer.find('.create-img');
        var change = imgContainer.find('.change');
        var queryString = URL.params;
        var uuid = queryString.activity_uuid;
        var img = imgContainer.find('img');
        var theme = queryString.theme || 0;
        // 更新DOM的theme属性,表示当前图片主题
        imgContainer.data('theme', theme);
        // 发布，生成邀请卡，调起app
        createImg.on('click', function () {
            var me = this;
            loading.show();
            createImg
                .css('background', '#ddd')
                .attr('disabled', 'disabled');
            change.css('display', 'none');
            uuid = imgContainer.data('uuid');
            service.get('/invite-card/create', {
                name: queryString.name,
                quota: queryString.quota,
                begin_time: queryString.begin_time,
                end_time: queryString.end_time,
                course_number: queryString.course_number,
                course_type: queryString.course_type,
                uuid: uuid,
                storage_id: imgContainer.data('storage-id'),
                theme: imgContainer.data('theme')
            }, function (res) {
                if (+res.code === 0) {
                    // 请求native并跳转native页面
                    var imgURL = img.data('src');
                    jockey.send('inviteCard', {
                        'imgId': uuid,
                        'imgUrl': imgURL
                    });
                }
                else {
                    createImg
                        .css('background', '#ff9100')
                        .removeAttr('disabled');
                    change.css('display', 'inline-block');
                }
                loading.hide();
            });
        });
        // 切换图片主题
        change.on('click', function () {
            var theme = imgContainer.data('theme');
            theme = theme < (themes.length - 1)
                  ? themes[++theme]
                  : 0;
            if (!hasChangeTheme) {
                hasChangeTheme = true;
                loading.show();
                createImg.css('background', '#ddd');
                service.get('/invite-card/image', {
                    name: queryString.name,
                    course_number: queryString.course_number,
                    course_type: queryString.course_type,
                    theme: theme
                }, function (res) {
                    if (+res.code === 0) {
                        var data = res.data;
                        var parent = img.parent();
                        img.remove();
                        var newImg = $('<img>');
                        newImg.data('src', data.image_url);
                        parent.append(newImg);
                        img = newImg;
                        imgContainer.data('theme', theme);
                        imgContainer.data('storage-id', data.storage_id);
                        imgContainer.data('uuid', data.uuid);
                        lazyLoadImage.init();
                    }
                    loading.hide();
                    createImg.css('background', '#ff9100');
                    hasChangeTheme = false;
                });
            }
        });
    }


    return function (pageData) {
        imgContainer = $('.img-container');
        themes = pageData.data.image_item;

        shareBind();
        lazyLoadImage.init();
    };

});