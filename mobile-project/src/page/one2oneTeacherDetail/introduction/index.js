define(function (require) {
    var $ = require('zepto');
    var template = require('artTemplate');

    var audioComponent = require('common/component/audio/index');
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');
    
    var render = template.compile(require('text!./render.tpl'));
    var container = $('#page_main');
    var dom = $('.introduce');
    var picContent = $('.pics-content');
    var dialog;

    // 初始化视频的函数
    function initVideo () {
        var videoContent = $('.video-frame');
        videoContent
            .unbind('click')
            .on('click', function () {
                var that = $(this);
                document.domain = 'genshuixue.com';
                try {
                    var playFrame = that;
                    //playFrame.contentWindow.postMessage(JSON.stringify({startPlay: true}), '*');
                    videoPlayer = playFrame.contentWindow.document.getElementsByTagName('video');
                    if (videoPlayer[0].readyState === 4) {
                        videoPlayer[0].play();
		                $(videoPlayer).attr('autoplay', 'autoplay');
                    }
                    else {
                        videoPlayer[0].load();
                        videoPlayer[0].oncanplay = playVideo;
                    }
                }
                catch (e) {}
        });
    }

    // 如果图片不够四张，则用灰色的色块代替
    function initColorSection () {
       var imaLength =  picContent.find('img').length;
       var emptyPic = '';
       if (imaLength < 4) {
           var picsL = picContent.find('img').length;
            for(var i = 0; i < 4 - picsL; i++) {
                emptyPic += '<div class="grey-pic"><div class="grey-text">未上传</div></div>';
            } 
       }
       picContent.append(emptyPic); 
       picContent.find('.grey-pic').each(function () {
            var that = $(this);
            var width = that.width();
            that.css('height', width + 'px');
       });
    }

    // 拉起技巧的弹窗
    function clickSkillBox (skills) {
        container
            .unbind('click', '.more-skills')
            .on('click', '.more-skills', function () {
                var skillContent = render({
                    skills: skills
                });

                if (!dialog) {
                    dialog = new SlideInDialog({
                        content: skillContent
                    });
                }
                dialog.show();
                $('.tags-box .close-box')
                    .unbind('click')
                    .on('click', function () {
                        dialog.hide();
                    });

        });
    }

    // 初始化标签，大致判断标签的
    function initSkills(skills) {
        var introdution = $('.introduce');
        var tags = introdution.find('.tags');
        var moreSkills = container.find('.introduce .more-skills');
        var allItemWidth = 0;
        tags.find('.item').each(function () {
            var that = $(this);
            allItemWidth += that.width();
        });
        var lineNumber = allItemWidth / introdution.width();
        if (lineNumber > 2) {
            tags
                .addClass('has-more-tags');
            moreSkills
                .removeClass('hide');
        } 
    }

    return function () {
        var audioContent = dom.find('.header-line .audio');
        dialog = this.dialog;
        audioComponent.initAudioLength(audioContent.find('.audio-length'));
        audioContent
            .unbind('click')
            .on('click', function () {
                audioComponent.playAudio({
                    dom: audioContent,
                });
            });

        initVideo();
        // initColorSection();
        clickSkillBox(this.skill);
        initSkills(this.skill);
    };
});