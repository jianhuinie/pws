/**
 * @file 设置视频课
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var VideoCropDialog = require('common/component/VideoCropDialog');
    var UploadVideoCourse = require('common/component/UploadVideoCourse');
    var service = require('common/service');
    var store = require('common/store');
    var Editor = require('common/component/Editor');
    var TagInput = require('common/component/TagInput');
    var Select = require('cobble/form/Select');
    var Validator = require('cobble/form/Validator');

    function dontConfirmOnLeave() {
        $(window).off('beforeunload');
    }

    exports.init = function () {

        var container = $('#content');
        var videoInfo = container.find('.video-info');
        var videoContent = container.find('.video-content');
        var videoUpload = container.find('.video-upload');
        var addVideoFlag = false; //是否点击添加视频按钮标识

        /**
         * 科目缓存
         *
         * @inner
         * @type {Object}
         */
        var cache = { };

        function getSubjectList(id) {

            if (cache[id]) {

                var promise = $.Deferred();

                setTimeout(
                    function () {
                        promise.resolve(cache[id]);
                    },
                    0
                );

                return promise;
            }

            return service
            .getSubjectList({ id: id })
            .done(function (response) {
                if (response.code === 0) {
                    cache[id] = response;
                }
                return response;
            });

        }
        /**
         * 转换数据源
         *
         * @inner
         * @param {Array} datasource
         * @return {Array}
         */
        function convert(datasource) {
            return $.map(
                datasource,
                function (item) {
                    return {
                        text: item.name,
                        value: item.id
                    };
                }
            );
        }

        // ***************** 设置课程信息 ******************

        // 课程简介
        // 文本域剩余字数
        new Editor({
            element: videoInfo.find('.course-summary').parent(),
            maxLength: 200
        });
        // 课程标题
        new Editor({
            element: videoInfo.find('.course-title').parent(),
            maxLength: 20
        });
        // 课程标签
        var tags = new TagInput({
            element: videoInfo.find('.course-tag'),
            max: 8,
            validate: function (text) {

                if (text.length > 8) {
                    return false;
                }

                return /^[\w\u4e00-\u9fa5]+$/.test(text);
            }
        });
        // var tags = tags.getValue();
        // tags.setValue(data.tags || '');
        if (store.get('taglist')) {
            tags.setValue(store.get('taglist') || '');
        }

        var validator = new Validator({
            element: videoInfo,
            realtime: true,
            fields: {
                course_title: {
                    rules: {
                        required: true,
                        maxlength: 20
                    },
                    errors: {
                        required: '请输入课程标题',
                        maxlength: '请不要超过 20 个字'
                    }
                },
                course_price: {
                    errors: {
                        required: '请输入课程价格',
                        pattern: '价格格式错误',
                        min: '价格最低为0元',
                        max: '价格最高位 999999 元'
                    },
                    custom: function(element) {
                        //价格最多两位小数
                        var price = element.val();
                        if (!isNaN(price) && price > 0) {
                            price = parseFloat(price).toFixed(2);
                        }
                        element.val(price);
                    }
                },
                course_time: {
                    errors: {
                        required: '请输入观看期限',
                        pattern: '观看期限格式错误',
                        min: '观看期限最少为1天',
                        max: '观看期限最多 999999 天'
                    }
                },
                course_summary: {
                    rules: {
                        required: true,
                        maxlength: 200
                    },
                    errors: {
                        required: '请输入课程简介',
                        maxlength: '请不要超过 200 个字'
                    }
                }
            }
        });

        // 课程类目
        var categoryIds = null;
        if (store.get('category')) {
            categoryIds = store.get('category').split(',');
        }
        // 一级分类
        var cat1Select = new Select({
            element: videoInfo.find('.category1'),
            name: 'category1',
            onChange: function (e, data) {
                store.set('subjectid1',data.value);
                store.set('subjectid1text',data.text );
                store.set('subjectid2','');
                store.set('subjectid2text','');
                store.set('subjectid3','');
                store.set('subjectid3text','');
                cat2Select.setValue('');
                cat3Select.setValue('');
                $('.category2 .dropdown-menu').html('');
                $('.category3 .dropdown-menu').html('');
                getSubjectList(data.value)
                .done(function (response) {
                    if (response.code === 0) {
                        cat2Select.refresh({
                            data: convert(response.data.list)
                        });
                        if (categoryIds&&categoryIds[1]) {
                            cat2Select.setValue(
                                categoryIds[1]
                            );
                        }
                    }
                });
            }
        });
        // 二级分类
        var cat2Select = new Select({
            element: videoInfo.find('.category2'),
            name: 'category2',
            onChange: function (e, data) {
                store.set('subjectid2',data.value);
                store.set('subjectid2text',data.text );
                store.set('subjectid3','');
                store.set('subjectid3text','');
                cat3Select.setValue('');
                $('.category3 .dropdown-menu').html('');
                getSubjectList(data.value)
                .done(function (response) {
                    if (response.code === 0) {
                        cat3Select.refresh({
                            data: convert(response.data.list)
                        });
                        if (categoryIds&&categoryIds[2]) {
                            cat3Select.setValue(
                                categoryIds[2]
                            );
                        }
                    }
                });
            }
        });
        // 三级分类
        var cat3Select = new Select({
            element: videoInfo.find('.category3'),
            name: 'category3',
            onChange: function (e, data) {
                store.set('subjectid3',data.value);
                store.set('subjectid3text',data.text );
            }
        });
        // 加载一级类目
        getSubjectList()
        .done(function (response) {
            if (response.code === 0) {
                cat1Select.refresh({
                    data: convert(response.data.list)
                });
                if (categoryIds && categoryIds[0]) {
                    cat1Select.setValue(categoryIds[0]);
                }
            }
        });

        // 语言
        var videoLanguage = new Select({
            element: videoInfo.find('.language'),
            name: 'language',
            onChange: function (e, data) {
                store.set('language',{value:data.value,text:data.text});
            }
        });
        if (store.get('language')) {
            videoLanguage.setValue(store.get('language'));
        } else {
            // 默认选中普通话
            videoLanguage.setValue(1);
        }

        // 免费切换到收费课节样式变化
        // 收费切换到免费课节样式变化
        function changeSectionStyle(type) {

            var list = videoUpload.find('li');
            // 免费切换成付费
            if (type == 1) {
                list.each(function(i, item){
                    var tmp = $(item);
                    var tmpStatus = tmp.find('.section-title').next();
                    // 最后一个li是添加按钮
                    if (tmp.hasClass('add-lesson-video')) {
                        return;
                    }
                    if (tmp.find(':radio:eq(0)').prop('checked')) {
                        tmp.find('.lesson').addClass('lesson-cost');
                        tmpStatus.html('');
                    } else {
                        tmp.find('.lesson').addClass('lesson-try');
                        tmpStatus.html('试听课').removeClass('status2').addClass('status1');
                    }
                    tmp.find('.free').hide();
                    tmp.find('label').show();
                });
            }
            // 付费切换成免费
            if (type == 2) {
                list.each(function(i, item){
                    var tmp = $(item);
                    // 最后一个li是添加按钮
                    if (tmp.hasClass('add-lesson-video')) {
                        return;
                    }
                    tmp.find('.lesson').removeClass('lesson-try').removeClass('lesson-cost');
                    tmp.find('.free').show();
                    tmp.find('label').hide();
                    var tmpStatus = tmp.find('.section-title').next();
                    tmpStatus.html('免费课').removeClass('status1').addClass('status2');
                });
            }
        }
        // 设置免费课
        function setFreeCourse() {
            store.set('price', 0);
            videoInfo.find('.course-price').val('');

            videoInfo.find('.course-time').val('').prop('disabled',true);
            videoInfo.find('#free-time').prop('checked',false).prop('disabled',true);
            videoInfo.find('.course-time').parent().removeClass('has-error');
            // 从收费切换到免费
            changeSectionStyle(2);
        }
        // 取消免费课设置
        function setCostCourse() {
            store.set('price',videoInfo.find('.course-price').val());
            videoInfo.find('#free-course').prop('checked',false);

            videoInfo.find('.course-time').prop('disabled',false);

            var freeTime = videoInfo.find('#free-time');

            if (!freeTime.val()) {
                freeTime.prop('checked',true);
            }
            freeTime.prop('disabled',false);

            // 从免费切换到收费
            changeSectionStyle(1);
        }
        // 上传封面
        videoInfo
        .on('click', '.front-cover, .change-front-cover', function (e) {
            var dialog = new VideoCropDialog({
                onUploadComplete: function (response) {

                    if (response.code === 0) {

                        success('保存成功');
                        dialog.hide();
                        var data = response.data;
                        store.set('portrait',data.url);
                        var front = videoInfo.find('.front-cover-box');
                        var frontCover = front.find('.front-cover');
                        var img = front.find('img');
                        var changeFrontCover = front.find('.change-front-cover');
                        front.find('.point').hide();
                        front.find('.txt').hide();
                        frontCover.hide();
                        // 压缩封面
                        var cutPortrait = data.url + '@1e_180w_120h_1c_0i_1o_90Q_1x';
                        img.css({'display':'block'}).attr('src', cutPortrait);
                        changeFrontCover.css({'display':'block'});

                    }
                }
            });
        })
        .on('click', '#free-course', function (e) {
            setFreeCourse();
        })
        .on('keyup', '.course-price', function (e) {
            var element = $(this);
            if (element.val()) {
                setCostCourse();
            }
            if (element.val() === '0') {
                setFreeCourse();
                videoInfo.find('.course-price').val('0');
                videoInfo.find('#free-course').prop('checked',true);
            }
        })
        .on('click', '#free-time', function (e) {
            var element = $(this);
            if (element.prop('checked')){
                videoInfo.find('.course-time').val('');
            }
        })
        .on('keyup', '.course-time', function (e) {
            var element = $(this);
            if (element.val()) {
                videoInfo.find('#free-time').prop('checked',false);
            } else {
                videoInfo.find('#free-time').prop('checked',true);
            }
        })
        .on('click', '.price-list div', function(e) {
            videoInfo.find('.price-list div').removeClass('active');
            $(this).addClass('active');
        });


        // ******************* 视频课视频上传部分 ***************

        var uploadQueue = {};
        var sectionQueue = {};
        var queueIndex = 0;
        // 调整课节序号
        function fixVideoListSort() {
            var list = videoUpload.find('li');
            list.each(function(i, item){
                var element = $(item);
                if (i % 2 == 0) {
                    element.removeClass('right-side');
                } else {
                    element.addClass('right-side');
                }
                element.find('.num').html(i+1);
            });
        }
        // 继续上传队列
        function goOnUploading() {
            var index;
            videoUpload.find('.video-progress .txt').each(function(i, item){
                if ($(item).text() == '上传中') {
                    index = $(item).parent().parent().data('queueindex');
                }
            });
            // 继续上传队列中的视频
            var count = 0 ;
            var tmp = 100000 ;
            for (var p in uploadQueue) {
                if (parseInt(p) != index) {
                    count++;
                    if (parseInt(p)<tmp) {
                        tmp = parseInt(p);
                    }
                }
            }
            if (count > 0 ){
                var that = uploadQueue[tmp];
                var data = {
                    fileName: that.fileItem.file.name,
                    fileSize: that.fileItem.file.size
                };
                that.startQueueUpload(data);
            }
        }
        // 校验视频审核未通过的地方是否都已修改,如果全都修改了，则去掉错误标题
        function checkVideoSectionChange() {
            var flag = true ;
            videoUpload.find('.icon-info-circle').each(function(i, item){
                if (!$(item).hasClass('pass')) {
                    flag = false;
                }
            });
            if (flag) {
                videoUpload.parent().find('.wrong-title').addClass('pass').hide();
            }
        }

        videoUpload
        .on('blur', 'textarea', function(){// 失焦保存视频标题
            var element = $(this);
            var parent = element.parent();
            var text = element.val();

            if (!text) {
                return;
            }

            parent.removeClass('has-error');

            var info = element.next().next();
            element.val(text.substr(0,20));
            var flag = false;
            if (info.find('.section-title span').html() != text.substr(0,20)) {
                flag = true;
            }
            info.find('.section-title span').html(text.substr(0,20));
            info.show();
            element.hide();
            // 修改视频课节信息
            var data = {};

            if (parent.data('videoid')) {
                data.userNumber = store.get('user').number;
                data.number = store.get('number');
                data.sectionId = parent.data('sectionid');
                data.videoId = parent.data('videoid');
                data.name = parent.find('.section-title span').text() ;
                data.fileName = parent.data('filename');
                data.index = parent.index()+1;
                data.payStatus = store.get('price') ? (parent.find(':radio:eq(0)').prop('checked')? 2 : 3) : 1;
                data.type = 2; // type为2是修改

                service
                .setVideoCourseSection(
                    data
                )
                .done(function(response){
                    if (response.code === 0) {
                        // 如果改变标题,校验能否去掉审核不通过图标
                        if (flag) {
                            // 如果标题审核失败,内容审核失败
                            if (parent.data('terror') && parent.data('cerror')) {
                                if (parent.hasClass('cpass')) {
                                    parent.find('.icon-info-circle').addClass('pass').hide();
                                    checkVideoSectionChange();
                                } else {
                                    parent.addClass('tpass');
                                }
                            // 如果标题审核失败
                            } else if (parent.data('terror')) {
                                parent.find('.icon-info-circle').addClass('pass').hide();
                                checkVideoSectionChange();
                            }

                        }
                    }
                });
            }
        })
        .on('click', '.change-title', function(){// 更改视频标题
            var element = $(this);
            var parent = element.parent();
            parent.hide();
            var prev = parent.prev().prev();
            if (prev[0].nodeName.toLowerCase() != 'textarea') {
                var _html = [] ;
                _html.push('<textarea class="form-text lesson-title" placeholder="请输入长度在20个字以内的课节标题">',
                           parent.find('.section-title span').text(),
                           '</textarea><span class="error"><i class="icon icon-times-circle"></i>&nbsp;请输入课节标题</span>');
                parent.before($(_html.join('')));
                parent.parent().find('textarea').focus();
            } else {
                prev.show();
                prev.focus();
            }
        })
        .on('click', '.cancel-upload', function(){// 取消上传
            var element = $(this).parent();
            confirm({
                content: '您确认取消上传该视频吗？',
                title: '温馨提示',
                width: 330
            })
            .done(function () {
                var queueindex = element.data('queueindex');

                sectionQueue[queueindex].uploader.stop();
                sectionQueue[queueindex].element.show();
                // 取消禁用
                sectionQueue[queueindex].element.attr('disabled',false);
                delete uploadQueue[queueindex];
                element.html('');

                goOnUploading();
            });
        })
        .on('click', '.cancel-resume', function(){// 取消续传
            var element = $(this).parent();

            confirm({
                content: '您确认取消上传该视频吗？',
                title: '温馨提示',
                width: 330
            })
            .done(function () {
                var queueindex = element.data('queueindex');
                sectionQueue[queueindex].cancelResumeUpload();
                sectionQueue[queueindex].element.show();
                sectionQueue[queueindex].element.attr('disabled',false);
                delete uploadQueue[queueindex];
                element.html('');

                goOnUploading();
            });
        })
        .on('click', '.close', function(e){// 删除视频
            var element = $(e.target);

            confirm({
                content: '您确认删除该视频吗？',
                title: '温馨提示',
                width: 330
            })
            .done(function () {

                var parent = null;

                if (element.hasClass('close')) {
                    parent = element.parent();
                } else {
                    parent = element.parent().parent();
                }
                var videoProgress = parent.find('.video-progress');
                var queueindex = videoProgress.data('queueindex');

                // 修改视频课节信息
                var data = {};

                data.userNumber = store.get('user').number;
                data.number = store.get('number');
                data.sectionId = parent.data('sectionid');
                data.videoId = parent.data('videoid');
                if (data.sectionId && data.videoId) {
                    data.name = parent.find('.section-title span').text() ;
                    data.index = parent.index()+1;
                    data.fileName = parent.data('filename');
                    data.payStatus = store.get('price') ? (parent.find(':radio:eq(0)').prop('checked')? 2 : 3) : 1;
                    data.type = 3; // type为3是删除

                    service
                    .setVideoCourseSection(
                        data
                    )
                    .done(function(response){
                        if (response.code === 0) {
                            // 解决Dom中删除后继续上传的问题
                            if (sectionQueue[queueindex]) {
                                sectionQueue[queueindex].uploader.dispose();
                                delete uploadQueue[queueindex];
                                delete sectionQueue[queueindex];
                            }
                            parent.remove();
                            fixVideoListSort();
                            // 继续上传队列中的视频
                            goOnUploading();
                            // 检查是否去掉了审核未通过的部分
                            checkVideoSectionChange();
                        }
                    });
                } else {
                    // 解决Dom中删除后继续上传的问题
                    if (sectionQueue[queueindex]) {
                        sectionQueue[queueindex].uploader.dispose();
                        delete uploadQueue[queueindex];
                        delete sectionQueue[queueindex];
                    }
                    parent.remove();
                    fixVideoListSort();
                    // 继续上传队列中的视频
                    goOnUploading();
                    // 检查是否去掉了审核未通过的部分
                    checkVideoSectionChange();
                }
            });
        })
        .on('click', '.del', function(e) {// 删除删除视频
            var element = $(this);
            var parent = element.parent().parent();
            var uploadBtn = parent.find('.upload-video-course');
            element.prev().html('');
            var status = element.parent().find('.status');
            if (status[0]) {
                status.html('');
            }
            if (uploadBtn[0]) {
                uploadBtn.show().attr('disabled',false);
            } else {
                ++queueIndex;
                parent.find('.action').prepend($('<span class="btn btn-default upload-video-course">上传视频</span>'));
                var upload = parent.find('.upload-video-course');
                upload.attr('disabled',false);
                var videoProgress = parent.find('.video-progress');
                sectionQueue[queueIndex] =  new UploadVideoCourse({
                                                element: upload,
                                                uploadQueue: uploadQueue,
                                                queueIndex: queueIndex
                                            });

                videoProgress.data('queueindex', queueIndex);

            }
            parent.data('filename','');
        })
        .on('click', '.add-lesson-video', function(){// 添加视频
            if (!checkStepInfo(4)) {
                return;
            }

            if (!addVideoFlag) {
                alert('视频课最多允许添加100个课节！');
                addVideoFlag = true;
            }

            if (videoUpload.find('li').length >= 101) {
                alert('视频课最多允许添加100个课节！');
                return false;
            }

            videoUpload.closest('.section').removeClass('no-edit');
            var element = $(this);
            var index = element.index();

            var _html = [];
            var _option = '<label for="cost-course'+(index+1)+'" style="display:none;"><input name="video-course-radio'+(index+1)+'" type="radio" id="cost-course'+(index+1)+'" checked="checked">付费</label><label for="try-listen'+(index+1)+'" style="display:none;"><input name="video-course-radio'+(index+1)+'" type="radio" id="try-listen'+(index+1)+'">试听</label><span class="free">免费</span>';
            if (store.get('price')) {
                _option = '<label for="cost-course'+(index+1)+'"><input name="video-course-radio'+(index+1)+'" type="radio" id="cost-course'+(index+1)+'" checked="checked">付费</label><label for="try-listen'+(index+1)+'"><input name="video-course-radio'+(index+1)+'" type="radio" id="try-listen'+(index+1)+'">试听</label><span class="free" style="display:none;">免费</span>';
            }
            _html.push( '<div class="close"></div>',
                        '<div class="lesson'+ (store.get('price')? ' lesson-cost' : '') +'">',
                            '<div>',
                                '<span class="num">'+(index+1)+'</span><span class="txt">课节</span>',
                            '</div>',
                        '</div>',
                        '<textarea class="form-text lesson-title" placeholder="请输入长度在20个字以内的课节标题"></textarea>',
                        '<span class="error"><i class="icon icon-times-circle"></i>&nbsp;请输入课节标题</span>',
                        '<div class="info" style="display:none;">',
                            '<div class="section-title"><span></span></div>',
                            '<span></span>',
                            '<button class="btn btn-default change-title">更改</button>',
                        '</div>',
                        '<div class="video-progress"></div>',
                        '<div class="action">',
                            '<span class="btn btn-default upload-video-course">上传视频</span>',
                            _option,
                        '</div>');
            var item = $('<li></li>');
            item.html(_html.join(''));
            item.insertBefore(element);
            ++queueIndex;

            var uploadBtn = item.find('.upload-video-course'); // 上传视频按钮
            var videoProgress = item.find('.video-progress'); // 进度条
            var tmpStatus = item.find('.section-title').next();  // 试听课、免费课等
            if (!store.get('price')) {
                tmpStatus.html('免费课').removeClass('status1').addClass('status2');
            }

            sectionQueue[queueIndex] =  new UploadVideoCourse({
                                            element: uploadBtn,
                                            uploadQueue: uploadQueue,
                                            queueIndex: queueIndex
                                        });

            videoProgress.data('queueindex', queueIndex);
            // 兼容ie8调整排序
            fixVideoListSort();
        })
        .on('click', '.upload-video-course', function(){ // 上传视频前的判断
            var element = $(this);
            var parent = element.closest('li'); // li
            var target = parent.find('textarea'); // 标题框
            var sectionTitle = parent.find('.section-title span').text();

            if (!$.trim(target.val()) && !$.trim(sectionTitle)) {
                //alert('请先输入课节标题');
                parent.addClass('has-error');
                return false;
            } else {
                parent.removeClass('has-error');
            }
        })
        .on('click', ':radio', function(){// 试听和收费切换
            var element = $(this);
            var parent = element.parent().parent().parent();
            var tmpStatus = parent.find('.section-title').next();

            if (element.prop('id').indexOf('try-listen') > -1) {
                parent.find('.lesson').removeClass('lesson-cost').addClass('lesson-try');
                tmpStatus.html('试听课').addClass('status1');
            } else {
                parent.find('.lesson').removeClass('lesson-try').addClass('lesson-cost');
                tmpStatus.html('').removeClass('status1');
            }

            if (parent.data('videoid')) {
                var data = {};
                data.userNumber = store.get('user').number;
                data.number = store.get('number');
                data.sectionId = parent.data('sectionid');
                data.videoId = parent.data('videoid');
                data.name = parent.find('.section-title span').text() ;
                data.fileName = parent.data('filename');
                data.index = parent.index()+1;
                //收费 2，试听 3
                data.payStatus = store.get('price') ? (parent.find(':radio:eq(0)').prop('checked')? 2 : 3) : 1;
                data.type = 2; // type为2是修改

                service
                .setVideoCourseSection(
                    data
                )
                .done(function(response){
                    if (response.code === 0) {
                    }
                });
            }
        });

        // 拖动排序 隐藏掉排序功能,后期再加
        /*
        var beginPosition = {};
        var endPosition = {};
        var targetPosition = {x:0,y:0};
        var curElement = null ;

        videoUpload
        .on('mousedown', '.lesson', function(e){
            curElement = $(this).parent();
            curElement.addClass('moving');
            var target = $(e.target);

            beginPosition.x = e.pageX;
            beginPosition.y = e.pageY;
            return false;
        })
        .on('mouseup', '.lesson', function(e){
            var x = e.pageX;
            var y = e.pageY;

            var list = videoUpload.find('li');
            var length = list.length;
            list.each(function(i, item){

                var element = $(item);

                if (i == length - 1) {
                    curElement.css({
                        'position': 'relative',
                        'z-index': 1,
                        'top': 0,
                        'left': 0
                    });
                    beginPosition = {};
                    targetPosition = {x:0,y:0};
                    return false;
                }
                if (!element.hasClass('moving')) {
                    var itemX = element.offset().left + 340;
                    var itemY = element.offset().top + 144;
                    if (itemX >= x && itemY >= y) {

                        curElement.css({
                            'position': 'relative',
                            'z-index': 1,
                            'top': 0,
                            'left': 0
                        });
                        curElement.insertBefore(element);
                        curElement.removeClass('moving');
                        beginPosition = {};
                        targetPosition = {x:0,y:0};

                        fixVideoListSort();
                        return false;
                    }
                }
            });
            return false;
        });

        videoUpload.mousemove(function(e){

            if (!beginPosition.x) {
                return false;
            }
            var target = $(e.target);

            endPosition.x = e.pageX;
            endPosition.y = e.pageY;
            var xSize = endPosition.x - beginPosition.x;
            var ySize = endPosition.y - beginPosition.y;
            curElement.css({
                'position': 'relative',
                'z-index': 2,
                'top': targetPosition.y + ySize,
                'left': targetPosition.x + xSize
            });
            targetPosition.x = targetPosition.x + xSize;
            targetPosition.y = targetPosition.y + ySize;
            beginPosition.x = endPosition.x;
            beginPosition.y = endPosition.y;
            return false;
        })*/


        // ******************** 视频课详情部分 *****************
        // 编辑器
        var editor = null ;
        if (store.get('status') == 1 ) {
            editor = new UE.ui.Editor({
                initialFrameHeight: 400,
                maximumWords: 5000
            });
            editor.render(
                container.find('.editor')[0]
            );
            editor.addListener('contentchange', function () {
                checkStepInfo(6);
            });
        }
        // 不保存课程信息
        function unSaveVideoInfo() {
            // 还原课程标题
            videoInfo.find('.course-title').val(videoInfo.find('.video-course-title p').html());
            // 还原课程简介
            videoInfo.find('.course-summary').val(videoInfo.find('.video-course-summary p').html());
            // 还原课程标签
            var taglist = videoInfo.find('.tag-item');
            var tagArray = [];
            taglist.each(function(i, item){
                tagArray.push($(item).html());
            });
            tags.setValue(tagArray.join(','));
            // 还原语言
            videoLanguage.setValue(videoInfo.find('.video-course-language p').data('lid'));
            // 还原分类
            var catids = videoInfo.find('.video-course-category p').data('cid');
            var catArray = catids.split(',');
            cat1Select.setValue(catArray[0]);
            cat2Select.setValue(catArray[1]);
            cat3Select.setValue(catArray[2]);
            // 还原封面
            store.set('portrait', store.get('portraitCopy'));
            videoInfo.find('.front-cover-img').prop('src', store.get('portraitCopy'));
            // 还原价格
            var priceText = videoInfo.find('.video-course-price p').text();
            if (priceText == '免费课') {
                setFreeCourse();
            } else {
                videoInfo.find('.course-price').val(priceText.substr(1));
                setCostCourse();
            }
            // 还原期限
            var timeText = videoInfo.find('.video-course-time p').text();
            if (timeText == '该视频课永久有效') {
                if (store.get('price')) {
                    videoInfo.find('#free-time').prop('checked',true);
                }
                videoInfo.find('.course-time').val('');
            } else {
                videoInfo.find('#free-time').prop('checked',false);
                videoInfo.find('.course-time').val(timeText.substr(0,timeText.indexOf('天')));
            }

        }
        // 检查课程信息设置是否有值
        function checkVideoInfo() {
            // 检查封面
            if (store.get('portrait')) {
                return true;
            }
            // 检查标题
            if (videoInfo.find('.course-title').val()) {
                return true;
            }
            // 检查价格
            if (videoInfo.find('.course-price').val()) {
                return true;
            }
            // 检查观看期限
            if ($('#free-time').is(':checked') || videoInfo.find('.course-time').val()) {
                return true;
            }
            // 检查课程简介
            if (videoInfo.find('.course-summary').val()) {
                return true;
            }
            // 课程分类
            if ( store.get('subjectid1') ||
                 store.get('subjectid2') ||
                 store.get('subjectid3') ) {
                return true;
            }

            return false;
        }
        // 检查课程信息设置是否更新
        function checkVideoInfoDiff(hide) {
            // 检查封面
            if (store.get('portrait') != store.get('portraitCopy')) {
                if (hide) {
                     videoInfo.find('.video-course-cover .icon-info-circle').addClass('pass').removeClass('icon-info-circle');
                    videoInfo.find('.video-course-cover .error-tip').hide();
                } else {
                    return true;
                }
            }
            // 检查标题
            if (videoInfo.find('.course-title').val()
                != videoInfo.find('.video-course-title p').html()) {
                if (hide) {
                    videoInfo.find('.video-course-title .icon-info-circle').addClass('pass').removeClass('icon-info-circle');
                    videoInfo.find('.video-course-title .error-tip').hide();
                } else {
                    return true;
                }
            }
            // 检查课程简介
            if (videoInfo.find('.course-summary').val()
                != videoInfo.find('.video-course-summary p').html()) {
                if (hide) {
                    videoInfo.find('.video-course-summary .icon-info-circle').addClass('pass').removeClass('icon-info-circle');
                    videoInfo.find('.video-course-summary .error-tip').hide();
                } else {
                    return true;
                }
            }
            // 检查课程标签
            var taglist = videoInfo.find('.tag-item');
            var tagArray = [];
            taglist.each(function(i, item){
                tagArray.push($(item).html());
            });
            if (tags.getValue() != tagArray.join(',')) {
                if (hide) {
                    videoInfo.find('.video-course-tags .icon-info-circle').addClass('pass').removeClass('icon-info-circle');
                    videoInfo.find('.video-course-tags .error-tip').hide();
                } else {
                    return true;
                }
            }
            // 检查语言
            if (store.get('language').value != videoInfo.find('.video-course-language p').data('lid')) {
                if (hide) {
                    videoInfo.find('.video-course-language .icon-info-circle').addClass('pass').removeClass('icon-info-circle');
                    videoInfo.find('.video-course-language .error-tip').hide();
                } else {
                    return true;
                }
            }
            // 检查分类
            if ((store.get('subjectid1') + ',' +
                 store.get('subjectid2') + ',' +
                 store.get('subjectid3')) != videoInfo.find('.video-course-category p').data('cid')) {
                if (hide) {
                    videoInfo.find('.video-course-category .icon-info-circle').addClass('pass').removeClass('icon-info-circle');
                    videoInfo.find('.video-course-category .error-tip').hide();
                } else {
                    return true;
                }
            }

            // 检查价格
            var priceText = videoInfo.find('.video-course-price p').text();
            if (priceText == '免费课') {
                if (store.get('price')){
                    if (hide) {
                        videoInfo.find('.video-course-price .icon-info-circle').addClass('pass').removeClass('icon-info-circle');
                        videoInfo.find('.video-course-price .error-tip').hide();
                    } else {
                        return true;
                    }
                }
            } else {
                if (videoInfo.find('.course-price').val() != priceText.substr(1)) {
                    if (hide) {
                        videoInfo.find('.video-course-price .icon-info-circle').addClass('pass').removeClass('icon-info-circle');
                        videoInfo.find('.video-course-price .error-tip').hide();
                    } else {
                        return true;
                    }
                }
            }

            // 检查观看期限
            var timeText = videoInfo.find('.video-course-time p').text();

            if (timeText == '该视频课永久有效') {
                if (store.get('price')&&!videoInfo.find('#free-time').is(':checked')) {
                    if (hide) {
                        videoInfo.find('.video-course-time .icon-info-circle').addClass('pass').removeClass('icon-info-circle');
                        videoInfo.find('.video-course-time .error-tip').hide();
                    } else {
                        return true;
                    }
                }
            } else {
                var a = videoInfo.find('#free-time').is(':checked');
                var b = videoInfo.find('.course-time').val() != timeText.substr(0,timeText.indexOf('天'));
                if (videoInfo.find('.course-time').val() != timeText.substr(0,timeText.indexOf('天'))
                    || videoInfo.find('#free-time').is(':checked')) {
                    if (hide) {
                        videoInfo.find('.video-course-time .icon-info-circle').addClass('pass').removeClass('icon-info-circle');
                        videoInfo.find('.video-course-time .error-tip').hide();
                    } else {
                        return true;
                    }
                }
            }

            if (hide) {
                // 去掉头部审核未通过提示
                var flag = true;
                videoInfo.find('.icon-info-circle').each(function(i, item){
                    if (!$(item).hasClass('pass')) {
                        flag = false;
                    }
                });
                if (flag) {
                    videoInfo.parent().find('.wrong-title').addClass('pass').hide();
                }
            }
            return false;
        }
        // 检查步骤信息
        // 立即发布课程  判断标准1,2,3步处于保存态
        // 保存至待发布课程
        function checkStepInfo( option ) {

            var array = [];

            // 立即发布课程校验
            if (option == 1) {
                if (!videoInfo.parent().hasClass('no-edit')) {
                    array.push(1);
                }
                if (!videoUpload.parent().hasClass('no-edit')) {
                    array.push(2);
                }
                if (!videoContent.parent().hasClass('no-edit') ||
                    (editor&&!editor.getContent()) ||
                    (!videoContent.find('.content').html())) {
                    array.push(3);
                }
                if (array.length >0) {
                    alert('请先保存 “第'+array.join(',')+'步” 信息！');
                    return false;
                }
                return true;
            }

            // 保存至待发布课程校验
            if (option == 2) {
                if (!videoInfo.parent().hasClass('no-edit')) {
                    array.push(1);
                }
                if (!videoUpload.parent().hasClass('no-edit')) {
                    array.push(2);
                }
                // 如果处于编辑态,并且值不空,就提示保存
                if (!videoContent.parent().hasClass('no-edit')&&editor&&editor.getContent()) {
                    array.push(3);
                }
                if (array.length >0) {
                    alert('请先保存 “第'+array.join(',')+'步” 信息！');
                    return false;
                }
                return true;
            }

            // 关闭窗口校验
            if (option == 3) {
                // 如果3步中有处于编辑态,并且只要有值不空,就提示保存
                // 步骤1:不判断——价格和课程语言
                if (!videoInfo.parent().hasClass('no-edit') && checkVideoInfo()) {
                    array.push(1);
                }
                // 步骤2:只要有标签存在就不空
                if (!videoUpload.parent().hasClass('no-edit') && videoUpload.find('li').length > 1) {
                    array.push(2);
                }
                // 步骤3:直接判断内容
                if (!videoContent.parent().hasClass('no-edit') && editor && editor.getContent()) {
                    array.push(3);
                }
                if (array.length >0) {
                    return false;
                }
                return true;
            }

            // 编辑步骤2,3需要依赖于步骤1
            if (option == 4) {
                // 判断标准如果步骤1处于编辑态,则步骤2,3不能继续
                if (!videoInfo.parent().hasClass('no-edit')) {
                    array.push(1);
                }
                if (array.length >0) {
                    alert('请先保存 “第'+array.join(',')+'步” 信息！');
                    return false;
                }
                return true;
            }

            // 保存步骤2需要进行判断
            // 判断标准原文件名和新文件名都有
            if (option == 5) {
                var list = videoUpload.find('li');
                var flag = false;
                list.each(function(i, item){
                    var element = $(item);

                    if (!element.hasClass('add-section') &&
                        (!element.find('.section-title span').html() ||
                        !element.find('.title').html())) {
                        flag = true;
                    }
                });
                if (flag) {
                    alert('请先完善课节信息！');
                    return false;
                }
                return true;
            }

            // 保存步骤3的判断条件
            if (option == 6) {
                if (!videoUpload.parent().hasClass('no-edit')) {
                    alert('请先保存 “第2步” 信息！');
                    return false;
                }
                if (editor&&!editor.getContent()){
                    alert('请先完善课程详情信息！');
                    return false;
                }
                return true;
            }

        }
        // 离开前弹窗
        function confirmOnLeave() {
            $(window).on(
                'beforeunload',
                function () {
                    if (checkStepInfo(3)) {
                        return;
                    } else {
                        return '老师，你还有课程信息未保存，“离开此页” 将导致未保存的信息丢失哦！';
                    }
                }
            );
        }

        confirmOnLeave();
        // ********************* 全局部分 ***********************
        container
        // 保存课程信息
        .on('click', '.save-course', function (e) {

            if (!store.get('portrait')) {
                alert('请添加课程封面');
                return;
            }
            if (!validator.validate('course_title')) {
                return;
            }
            if (!$('#free-course').is(':checked')&&!validator.validate('course_price')) {
                return;
            }
            if (!$('#free-course').is(':checked')) {
                if (!$('#free-time').is(':checked')&&!validator.validate('course_time')) {
                    return;
                }
            }
            if (!validator.validate('course_summary')) {
                return;
            }

            if ( !store.get('subjectid1') ||
                 !store.get('subjectid2') ||
                 !store.get('subjectid3') ) {
                alert('请选择课程分类');
                return;
            }
            if (!store.get('language')) {
                alert('请选择课程语言');
                return;
            }

            var data = {};

            data.userNumber = store.get('user').number;
            data.number = store.get('number');
            data.title = videoInfo.find('.course-title').val();
            data.portrait = store.get('portrait');
            data.introduce = videoInfo.find('.course-summary').val();
            data.price = !$('#free-course').is(':checked') ? videoInfo.find('.course-price').val() : '0';
            data.expireTime = data.price ? (!$('#free-time').is(':checked') ? videoInfo.find('.course-time').val() : '0') : '0';
            data.subjectId = store.get('subjectid1')+','
                            +store.get('subjectid2')+','
                            +store.get('subjectid3')+','
                            +store.get('subjectid1text')+','
                            +store.get('subjectid2text')+','
                            +store.get('subjectid3text');
            data.language = store.get('language').value;
            data.labelIds = tags.getValue(); // videoInfo.find('.course-tag').val();

            service
            .setVideoCourseInfo(
                data,
                {
                    errorHandler: {
                        '100061': function (response) { // 敏感词过滤

                            var map = {
                                'title': '课程标题',
                                'introduce': '课程简介',
                                'label_ids': '课程标签'
                            };

                            var errorMsg = response.data;
                            var content = '你';

                            $.each(errorMsg, function (index, item) {

                                if (item.length) {
                                    content += '<span class="sensitive">在<em>' + map[index] + '</em>中输入的内容包含';
                                    $.each(item, function (i, j) {
                                        content += '“<em>' + j + '</em>”';
                                    });
                                    content += '；</span><br />';
                                }

                            });

                            content += '请删除后重新输入';

                            alert({
                                title: '温馨提示',
                                content: content,
                                width: 450,
                                buttons: [
                                    {
                                        text: '确定',
                                        type: 'primary',
                                        handler: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });

                        }
                    }
                }
            )
            .done(function(response){
                if (response.code === 0) {
                    success('保存成功！');
                    //隐藏审核未通过的提示
                    checkVideoInfoDiff(true);
                    //保存视频课id
                    store.set('number',response.data.number);
                    videoInfo.parent().removeClass('update-unpublish-mode')
                                      .removeClass('update-publish-mode')
                                      .addClass('no-edit');
                    store.set('portraitCopy',store.get('portrait'));
                    videoInfo.find('.video-course-title p').html(data.title);
                    var price_html = '';
                    if (parseInt(data.price)) {
                        price_html = '<span class="num" data-price="' + data.price + '"><em>￥</em>' + data.price + '</span>';
                        if (data.price_ios) {
                            price_html += '<em class="num-ios" data-price="' + data.price_ios + '">（苹果设备上售价￥' + data.price_ios + '）</em>';
                        }
                    } else {
                        price_html = '免费课';
                    }

                    videoInfo.find('.video-course-price p').html(price_html);
                    videoInfo.find('.video-course-time p').html(parseInt(data.expireTime) ? '<span class="num">'+data.expireTime+'<i>天</i></span>' : '该视频课永久有效');
                    videoInfo.find('.video-course-summary p').html(data.introduce);
                    videoInfo.find('.video-course-category p').html(store.get('subjectid1text')+'/'+store.get('subjectid2text')+'/'+store.get('subjectid3text'))
                                                              .data('cid',store.get('subjectid1')+','+store.get('subjectid2')+','+store.get('subjectid3'));
                    videoInfo.find('.video-course-language p').html(store.get('language').text).data('lid',store.get('language').value);

                    var taglist = videoInfo.find('.video-course-tags .video-tag-list');
                    if (tags.getValue()) {
                        var array = data.labelIds.split(',');
                        var _html = [];
                        for (var i = 0; i < array.length; i++) {
                            _html.push('<li class="tag-item">'+array[i]+'</li>');
                        }
                        taglist.html(_html.join(''));
                        taglist.show();
                    } else {
                        taglist.hide();
                    }

                    store.set('firstSaveInfo', true);
                }
            });

        })
        // 不保存课程信息
        .on('click', '.not-save-course', function (e) {
            // status 为1表示新增 2更新未发布 3更新已发布
            if (checkVideoInfoDiff()) {
                confirm({
                    content: '你所更新的信息都将丢失，确认不保存？',
                    title: '温馨提示',
                    width: 330
                })
                .done(function () {
                    if (store.get('status') == 1 && !store.get('firstSaveInfo')) {
                        videoInfo.find('input').val('');
                        videoInfo.find('textarea').val('');
                        tags.setValue('');
                        videoLanguage.setValue('');
                        cat1Select.setValue('');
                        cat2Select.setValue('');
                        cat3Select.setValue('');
                        var frontCoverBox = videoInfo.find('.front-cover-box');
                        frontCoverBox.find('.front-cover').show();
                        frontCoverBox.find('img').hide();
                        frontCoverBox.find('.point').show();
                        frontCoverBox.find('.txt').show();

                        videoInfo.find('strong:eq(0)').html('20');
                        videoInfo.find('strong:eq(1)').html('200');

                        store.set('portrait', null);
                        store.set('subjectid1', null);
                        store.set('subjectid2', null);
                        store.set('subjectid3', null);
                        store.set('subjectid1text', null);
                        store.set('subjectid2text', null);
                        store.set('subjectid3text', null);
                        store.set('language', null);
                    } else {
                        videoInfo.parent().removeClass('update-unpublish-mode')
                                          .removeClass('update-publish-mode')
                                          .addClass('no-edit');
                        unSaveVideoInfo();
                    }
                });
            } else {
                videoInfo.parent().removeClass('update-unpublish-mode')
                                  .removeClass('update-publish-mode')
                                  .addClass('no-edit');
                unSaveVideoInfo();
            }
        })
        // 保存视频课节
        .on('click', '.save-lesson', function (e) {
            // 先判断课程信息是否保存了
            if (!checkStepInfo(4)) {
                return;
            }
            // 在判断课节是否保存了
            if (!checkStepInfo(5)) {
                return;
            }

            // 修改视频课节信息
            var data = {};
            var list = videoUpload.find('li');
            var array = [];

            list.each(function(i,item){
                array.push($(item).data('sectionid'));
            });

            if (array.length < 2) {
                alert('请先完善课节信息！');
                return;
            }

            data.userNumber = store.get('user').number;
            data.number = store.get('number');
            data.sectionIds = array.join(',');

            service
            .setAllVideoCourseSection(
                data
            )
            .done(function(response){
                if (response.code === 0) {
                    videoUpload.parent().addClass('no-edit');
                    //去掉审核未通过提示
                }
            });

        })
        // 保存课程详情
        .on('click', '.save-detail', function (e) {
            if (!checkStepInfo(6)) {
                return;
            }

            var content = editor.getContent();
            var len = editor.getContentLength(true);

            if (len.length > 5000) {
                alert('请不要输入超过 5000 个字');
                return;
            }

            var iframe = editor.iframe;
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            var tooLarge = false;

            $('img', doc).each(function () {
                $(this).attr({
                    width: this.width,
                    height: this.height
                });

                if (this.width > 790) {
                    tooLarge = true;
                }
            });

            if (tooLarge) {
                alert({
                    title: '温馨提示',
                    content: '插入的图片宽度大于最大展现宽度 790px，请进行缩小处理吧',
                    width: 400
                });
                return;
            }

            var data = {};
            data.userNumber = store.get('user').number;
            data.number = store.get('number');
            data.brief = content;

            service
            .setVideoCourseBrief(
                data,
                {
                    errorHandler: {
                        '100061': function (response) { // 敏感词过滤

                            var map = {
                                'brief': '课程详情'
                            };

                            var errorMsg = response.data;
                            var content = '你';

                            $.each(errorMsg, function (index, item) {

                                if (item.length) {
                                    content += '<span class="sensitive">在<em>' + map[index] + '</em>中输入的内容包含';
                                    $.each(item, function (i, j) {
                                        content += '“<em>' + j + '</em>”';
                                    });
                                    content += '；</span><br />';
                                }

                            });

                            content += '请删除后重新输入';

                            alert({
                                title: '温馨提示',
                                content: content,
                                width: 450,
                                buttons: [
                                    {
                                        text: '确定',
                                        type: 'primary',
                                        handler: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });

                        }
                    }
                }
            )
            .done(function(response){
                if (response.code === 0) {
                    success('保存成功！');
                    // 保存视频详情
                    //store.set('videoContent',content);
                    // 如果有修改，则去掉审核未通过提示
                    if (content != videoContent.find('.content').html()) {
                        videoContent.parent().find('.wrong-reason').hide();
                    }
                    videoContent.find('.content').html(content).show();
                    videoContent.parent().addClass('no-edit');
                }
            });
        })
        // 不保存课程详情
        .on('click', '.not-save-detail', function (e) {
            if (editor.getContent() != videoContent.find('.content').html()) {
                confirm({
                    content: '你所更新的信息都将丢失，确认不保存？',
                    title: '温馨提示',
                    width: 330
                })
                .done(function () {
                    videoContent.parent().addClass('no-edit');
                    editor.setContent(
                        videoContent.find('.content').html()
                    );
                    editor.hide();
                    videoContent.find('.content').show();
                });
            } else {
                videoContent.parent().addClass('no-edit');
                editor.setContent(
                    videoContent.find('.content').html()
                );
                editor.hide();
                videoContent.find('.content').show();
            }
        })
        // 立即发布课程vs保存至待发布列表
        .on('click', '.publish-course, .pre-publish-course', function (e) {

            var element = $(this);

            if (element.hasClass('publish-course') && !checkStepInfo(1)) {
                return;
            }

            if (element.hasClass('pre-publish-course') && !checkStepInfo(2)){
                return;
            }

            var data = {};

            data.userNumber = store.get('user').number;
            data.number = store.get('number');

            if (element.hasClass('pre-publish-course')) {
                data.type = 2; //保存至待发布列表
            } else {
                data.type = 1; //立即发布课程
                /*if (element.html() == '立即更新课程') {
                    data.type = 3; // 已下架的更新后状态不变
                }*/
                var uploadWrongTitle = videoUpload.parent().find('.wrong-title');
                var infoWrongTitle = videoInfo.parent().find('.wrong-title');
                if (infoWrongTitle[0] && !infoWrongTitle.hasClass('pass')) {
                    alert({
                        title: '温馨提示',
                        content: '还有审核不通过的课程内容未修改哦~',
                        width: 450,
                        buttons: [
                            {
                                text: '马上修改',
                                type: 'primary',
                                handler: function () {
                                    this.hide();
                                }
                            }
                        ]
                    });
                    return false;
                }
                if (uploadWrongTitle[0] && !uploadWrongTitle.hasClass('pass')) {
                    var videoUploadStatus = videoUpload.data('status');
                    var errorText = '马上替换';
                    var errorContent = '还有未转码成功的视频课节没有替换哦~';

                    if (videoUploadStatus == 4) {
                        errorText = '马上修改';
                        errorContent = '还有审核不通过的课程内容未修改哦~';
                    }

                    alert({
                        title: '温馨提示',
                        content: errorContent,
                        width: 450,
                        buttons: [
                            {
                                text: errorText,
                                type: 'primary',
                                handler: function () {
                                    this.hide();
                                }
                            }
                        ]
                    });
                    return false;
                }

            }

            service
            .saveVideoCourse(
                data
            )
            .done(function(response){
                if (response.code === 0) {
                    if (element.hasClass('pre-publish-course')) {
                        success('保存至待发布列表成功！');
                        location.href = '/video_course/getcourselist?type=4&page=1&page_size=10';
                    } else {
                        /*if (data.type == 1) {
                            success('发布成功！');
                            location.href = '/video_course/getcourseshowdetail?number='+store.get('number')+'&user_number='+store.get('user').number;
                        } else {
                            alert({
                                title: '温馨提示',
                                content: '课程更新成功，你可以在视频课管理中上架该课程！',
                                buttons: [
                                    {
                                        text: '确定',
                                        type: 'primary',
                                        handler: function () {
                                            this.hide();
                                            location.href = '/video_course/getcourselist?type=5&page=1&page_size=10';
                                        }
                                    }

                                ]
                            });

                        }*/
                        location.href = '/video_course/getcourselist?type=1&page=1&page_size=10';
                    }
                }
            });
        })
        // 编辑模式
        .on('click', '.video-info-edit, .video-upload-edit, .video-content-edit', function (e) {
            var element = $(this);
            var parent = null;
            if (element.hasClass('video-info-edit')) {
                parent = videoInfo.parent();
                if (store.get('status') == 3) {
                    parent.addClass('update-publish-mode');
                }
                if (store.get('status') == 2) {
                    parent.addClass('update-unpublish-mode');
                }
                parent.removeClass('no-edit');

                if (store.get('price')) {
                    videoInfo.find('')
                } else {
                    videoInfo.find('#free-course').prop('checked',true);
                    videoInfo.find('#free-time').prop('checked',false).prop('disabled',true);
                    videoInfo.find('.course-time').val('').prop('disabled',true);
                }
            } else if (element.hasClass('video-upload-edit')) {
                parent = videoUpload.parent();
                parent.removeClass('no-edit');
            } else {
                parent = videoContent.parent();
                if (!editor) {
                    videoContent.find('textarea').show();
                    videoContent.find('.content').hide();
                    editor = new UE.ui.Editor({
                        initialFrameHeight: 400,
                        maximumWords: 5000
                    });
                    editor.render(
                        container.find('.editor')[0]
                    );
                } else {
                    editor.show();
                    videoContent.find('.content').hide();
                    editor.setContent(
                        videoContent.find('.content').html()
                    );
                }
                parent.removeClass('no-edit');
            }

        });

        // 课程信息置成编辑态
        if (store.get('edit_info')) {
            $('.video-info-edit').click();
        }
        // 课程视频置成编辑态
        if (store.get('edit_video')) {
            $('.video-upload-edit').click();
            var el = $('.video-upload .add-section').prev();
            if (el.find('.change-title')[0]) {
                el.find('.change-title').click();
            }
        }

    };

});