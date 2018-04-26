/*
* @file 兴趣问答页面
* @author caoying
* @date 2016-03-08
* */

define(function(require){
    'use strict';
    var $ = require("zepto");
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');
    var service = require('common/service');
    var doShare = require('common/share/doShare');  // 分享
    var container = $("#page_main");

    var firstValue;
    var secondValue;
    var thirdValue;
    var forthValue;
    var resultArray = {};
    var shareInfo;

    // 初始化结果数据
    var initResult = function() {
        resultArray['INTP'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b3d633f21.jpg";
        resultArray['ESTP'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b3222e7e6.jpg";
        resultArray['ISFP'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b4b552848.jpg";
        resultArray['ENTJ'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b5088e22a.jpg";
        resultArray['ISFJ'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b58b4633f.jpg";
        resultArray['INTJ'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b5f18d164.jpg";
        resultArray['ISTP'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b6422382f.jpg";
        resultArray['ESFP'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b690ce461.jpg";
        resultArray['INFJ'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b6d269058.jpg";
        resultArray['ENFP'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b714f2228.jpg";
        resultArray['ESTJ'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b85751b98.jpg";
        resultArray['ISTJ'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b8578ff8f.jpg";
        resultArray['ENFJ'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b857c0f4b.jpg";
        resultArray['INFP'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b857e4257.jpg";
        resultArray['ENTP'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b8580a6f1.jpg";
        resultArray['ESFJ'] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b8584aa9e.jpg";
    };

    var showResult = function(result) {
        var resultContainer = container.find('.result');
        container.find('.question').hide();
        resultContainer.show();
        resultContainer.find('.result-info').html('<img width="100%" height="100%" src="'+ result +'">');
        lazyLoadImage.init(resultContainer,true);
    };

    // 计算结果
    var count = function() {
        var resultStr = firstValue + secondValue + thirdValue + forthValue;
        service.post('instruct_test_result',{
            answer: resultStr
        },function(response){
            if(response.code == 0) {
                shareInfo = response.data;
                setShare(shareInfo);
            }
        });
        showResult(resultArray[resultStr]);
    };

    // 封面翻页
    var changePage = function(){
        container
            .on('click', '.change-page', function(){
                $(this).closest('.cover').removeClass('active');
                container.find('.first-content').addClass('active');
                container.find('.question').show();
                lazyLoadImage.init(container.find('.first-content'),true);
                //container.find('.first-content').animate({
                //    rotateZ: '0', translate3d: '5px,5px,20px'
                //}, 1000, 'ease-in');

            });
    };

    // 再测一次
    var repeatTest = function() {
        container
            .on('click', '.repeat-test', function(){
                var coverPage = container.find('.cover');
                coverPage.addClass('active');
                container.find('.result').hide();
                container.find('.parent').removeAttr('style');
                container.find('.cover').removeAttr('style');
                container.find('.choose').removeClass('choose-first');
                container.find('.choose').removeClass('choose-second');
                lazyLoadImage.init(coverPage,true);
                //coverPage.animate({
                //    rotateZ: '0', translate3d: '0,0,20px'
                //}, 1000, 'ease-in');

            });
    };

    // 分享
    var shareFriend = function() {
        container
            .on('click', '.share-friend', function(){
                $('.share-mask').show();
            });

        container
            .on('click', '.share-mask', function(){
                $('.share-mask').hide();
            });
    };

    // 回答问题
    var answerQuestion = function () {
        container
            .on('click', '.first-button,.second-button', function(){
                var name = $(this).data('name');
                var that = $(this);
                $(this).siblings('.choose').removeClass('choose-first');
                $(this).siblings('.choose').removeClass('choose-second');
                $(this).siblings('.choose').addClass('choose-' + name );

                setTimeout(function(){
                    var currentContent = container.find('.active');
                    var nextContent = currentContent.data('next');
                    var nextPage = container.find('.'+ nextContent);
                    currentContent.hide();
                    currentContent.removeClass('active');

                    var checkedValue = that.data("value");

                    switch(nextContent) {
                        case "second-content":
                            firstValue = checkedValue;
                            break;
                        case "third-content":
                            secondValue = checkedValue;
                            break;
                        case "forth-content":
                            thirdValue = checkedValue;
                            break;
                        default:
                            forthValue = checkedValue;
                            count();
                            break;
                    }

                    nextPage.addClass('active');
                    //nextPage.animate({
                    //    rotateZ: '0', translate3d: '3px,5px,20px'
                    //}, 1000, 'ease-out');

                    lazyLoadImage.init(nextPage,true);
                },500);

            });
    };

    // 立即找老师
    var findTeacher = function() {
        container
            .on('click','.find-teacher', function(){
                var url =location.origin + '/recommend/fill_info?source=genshuixue&page_type=' + page_data.page_type;
                location.href = url;
            });

    };

    //music
    var addMusicEvent = function(){
        var _evt = function(){

        };
        var autoBlockDom = $(".auto-block");
        var _on = function(){
            autoBlockDom.removeClass("off");
            autoBlockDom.find("audio")[0].play();
        }

        var _off = function(){
            autoBlockDom.addClass("off");
            autoBlockDom.find("audio")[0].pause();
        };

        autoBlockDom.tap(function(evt){
            evt.stopPropagation();
            _init = true;
            if(autoBlockDom.hasClass("off")){
                _on();
            }else {
                _off();
            }
        });

        var _init = false;
        $("body").tap(function(){
           if(!_init){
               _on();
               _init = true;
           }
        });
    };

    return function(page_data){
        lazyLoadImage.init();

        addMusicEvent();
        initResult();
        changePage();
        repeatTest();
        shareFriend();
        answerQuestion();
        findTeacher();

        if (page_data.shareInfo) {
            setShare(
                JSON.parse(page_data.shareInfo)
            );
        }

    }
});