/**
 * @file 浅注册老师设置信息页
 * @author jixiaohui
 */
define(function(require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var Select = require('cobble/form/Select');
    var Validator = require('cobble/form/Validator');
    var compressImage = require('common/function/compressImage');
    var AvatarCropDialog = require('common/component/AvatarCropDialog');
    var container = $('.info-box');

    exports.init = function() {

        // 展示上报
        var params = {
            type: 't_greet',
            stype: 'tpc_gre',
            client: 'PC'
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);

        /**
         * 科目缓存
         *
         * @inner
         * @type {Object}
         */
        var cache = { };
        var info = store.get('info');

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


        // 课程类目
        var categoryIds = null;
        if (store.get('subjects')) {
            categoryIds = store.get('subjects');
        }
        // 一级分类
        var cat1Select = new Select({
            element: container.find('.category1'),
            name: 'category1',
            onChange: function (e, data) {
                /*store.set('subjectid1',data.value);
                store.set('subjectid1text',data.text );*/
                if (categoryIds&&categoryIds[0]) {
                    container.find('.category1 .btn-default').attr('disabled','disabled');
                }
                container.find('input[name="subject_id"]').val('');
                checkInfoFinish();
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
                                categoryIds[1].id
                            );
                        }
                    }
                });
            }
        });
        // 二级分类
        var cat2Select = new Select({
            element: container.find('.category2'),
            name: 'category2',
            onChange: function (e, data) {
                /*store.set('subjectid2',data.value);
                store.set('subjectid2text',data.text );*/
                if (categoryIds&&categoryIds[1]) {
                    container.find('.category2 .btn-default').attr('disabled','disabled');
                }
                container.find('input[name="subject_id"]').val('');
                checkInfoFinish();
                cat3Select.setValue('');
                $('.category3 .dropdown-menu').html('');
                if (data.value) {
                    getSubjectList(data.value)
                    .done(function (response) {
                        if (response.code === 0) {
                            cat3Select.refresh({
                                data: convert(response.data.list)
                            });
                            if (categoryIds&&categoryIds[2]) {
                                cat3Select.setValue(
                                    categoryIds[2].id
                                );
                            }
                        }
                    });
                }
            }
        });
        // 三级分类
        var cat3Select = new Select({
            element: container.find('.category3'),
            name: 'subject_id',
            onChange: function (e, data) {
                /*store.set('subjectid3',data.value);
                store.set('subjectid3text',data.text );*/
                if (categoryIds&&categoryIds[2]) {
                    container.find('.category3 .btn-default').attr('disabled','disabled');
                }
                checkInfoFinish();
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
                    cat1Select.setValue(categoryIds[0].id);
                }
            }
        });

        // 验证对象
        var validator = new Validator({
            element: container.find('.name-section'),
            realtime: true,
            fields: {
                realname: {
                    errors: {
                        minlength: '请将字数控制在2-50个字以内',
                        maxlength: '请将字数控制在2-50个字以内',
                        pattern: '支持中文、字母、空格、“.”和“·”'
                    }
                }
            }
        });

        // 检查信息是否完整
        // 姓名，性别，科目为必填项
        function checkInfoFinish() {
            var flag = true;

            //检查姓名是否通过
            if (!container.find('input[name="realname"]').val()) {
                flag = false;
            } else {
                if (!validator.validate('realname')) {
                    flag =false;
                }
            }
            //检查性别是否选择
            if (!container.find('.sex-item').hasClass('active')) {
                flag = false;
            }
            //检查科目是否选择
            if (!container.find('input[name="subject_id"]').val()) {
                flag = false;
            }
            if (flag) {
                container.find('button').addClass('active');
            } else {
                container.find('button').removeClass('active');
            }
        }

        //if (!info.avatar) {
        container
        .on('click', '.upload, .upload-img', function (e) {
            var dialog = new AvatarCropDialog({
                onUploadComplete: function (response) {

                    if (response.code === 0) {

                        // 头像上传成功上报
                        var params = {
                            type: 't_greet',
                            stype: 'tpc_gre_ava',
                            client: 'PC'
                        };
                        WAT.send('http://click.genshuixue.com/gs.gif', params);

                        var data = response.data;
                        dialog.hide();

                        container.find('.upload-img').attr('src', compressImage({
                            url: data.url,
                            width: 150,
                            height: 150
                        })).show();
                        container.find('.upload').hide();
                        container.find('input[name="avatar"]').val(data.id);
                        checkInfoFinish();
                    }
                }
            })
        });
        //}
        if ((!info.sex && info.sex != 0) || info.sex == 2) {
            container
            .on('click', '.male-box, .female-box', function (e) {
                var element = $(this);
                container.find('.male-box').removeClass('active');
                container.find('.female-box').removeClass('active');
                element.addClass('active');
                if (element.hasClass('male-box')) {
                    container.find('input[name="sex"]').val(1);
                } else {
                    container.find('input[name="sex"]').val(0);
                }
                checkInfoFinish();
            });
        }

        container
        .on('click', 'button', function (e) {
            var element = $(this);
            if (!element.hasClass('active')) {
                return false;
            }

            // '加入跟谁学'点击上报
            var params = {
                type: 't_greet',
                stype: 'tpc_gre_sub',
                client: 'PC'
            };
            WAT.send('http://click.genshuixue.com/gs.gif', params);

            var data = {};
            data.avatar = container.find('input[name="avatar"]').val();
            data.sex = container.find('input[name="sex"]').val();
            data.realname = container.find('input[name="realname"]').val();
            data.subjectId = container.find('input[name="subject_id"]').val();

            service
            .upsertProfile({
                avatar: data.avatar,
                sex: data.sex,
                realname: data.realname,
                subjectId: data.subjectId
            })
            .done(function (response) {

                if (response.code === 0) {
                    success('保存成功');
                    location.href = response.data.url;
                }

            });
        })
        .on('blur', 'input[name="realname"]', function (e) {
            checkInfoFinish();
        })

    };

});